import { Button, TextInput } from "../../styles/components";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useApp } from "../../context/AppPorvider";
import { useSocketContext } from "../../context/SocketContext";
import ActiveUser from "../../components/pages/conversations/ActiveUser.jsx";
import { SubHeader } from "../../components/pages/SubHeader.jsx";
import SearchBar from "../../components/ui/SearchBar.jsx";
import ProfileImage from "../../assets/images/OIP.jpg";
import Conv from "../../components/pages/conversations/Conversation.jsx";
import {motion} from "framer-motion";
import {appVariants} from "../../animations/variants.js";
import {useUser} from "../../context/UserProvider.jsx";


const MessageList = () => {

    const {token} = useAuth();

    const {conversations, handleShowConversation} = useApp();
    const {friends, getFriends} = useUser();

    const {socket} = useSocketContext();

    const { messages, setMessages } = useApp();


    const [search, setSearch] = useState('');

    const SearchFriends = friends.length > 0 ? (friends.filter(friend => {
        let fullname = friend.firstname.toLowerCase() + " " + (friend.lastname ? friend.lastname.toLowerCase() : '');
        if (search && !fullname.includes(search.toLowerCase())) {
            return false;
        }
        return true;
    })) : null;

    useEffect(() => {

        getFriends();
        handleShowConversation();

        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
            handleShowConversation();
        });

        return () => socket?.off("newMessage")

    }, [socket, token, setMessages])

    return (
        <motion.section className="flex flex-col items-center justify-start w-full gap-6 relative  min-h-screen" variants={appVariants} initial="hidden" whileInView="visible" viewport={{once : true}}>
            <SubHeader name={"Messages"} icon={"bi bi-chat"}/>
            <div
                className="w-full h-fit bg-white-100 dark:bg-black-100 dark:border-none flex justify-start overflow-x-scroll p-4 border border-black-0 rounded-2xl scrollbar-none ">
                {friends.length > 0 ?
                    friends.map(friend => (
                        <ActiveUser key={friend.userid} friend={friend}/>
                    )) :
                    <div>
                        <Button icon="bi bi-plus-lg">Ajouter un ami</Button>
                    </div>
                }
            </div>

            <SearchBar variant={"fill"} block size={"lg"} value={search} setValue={setSearch} placeholder={"Rechercher un ami"} />

            <div className="w-full  h-[70%] bg-white-100 dark:bg-black-10 dark:border-none  flex flex-col gap-4 overflow-hidden p-4  rounded-xl border border-black-0">
                {
                    search ?
                        SearchFriends?.length > 0 ?
                            SearchFriends.map(conversation => (
                                <Conv key={conversation.userid} id={conversation.userid} userToChat={conversation} />
                            )
                            )
                            :
                            <p className="text-black-80 dark:bg-white-100 text-center">
                                Aucun resultat
                            </p>
                        :
                        conversations.length > 0 ?
                    conversations.map(conversation => (
                            <Conv key={conversation.userid} id={conversation.userid} userToChat={conversation}/>
                        )
                    )
                    :
                    <p className="text-black-80 dark:text-white-60  text-center">
                        Commencer une conversation !
                    </p>
                }
            </div>
        </motion.section>
    )
}
export default MessageList;
