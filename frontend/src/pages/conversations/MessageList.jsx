import { Button, TextInput } from "../../styles/components";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useApp } from "../../context/AppProvider";
import { useSocketContext } from "../../context/SocketContext";
import ActiveUser from "../../components/pages/conversations/ActiveUser.jsx";
import { SubHeader } from "../../components/pages/SubHeader.jsx";
import SearchBar from "../../components/ui/SearchBar.jsx";
import ProfileImage from "../../assets/images/OIP.jpg";
import Conv from "../../components/pages/conversations/Conversation.jsx";
import { motion } from "framer-motion";
import { appVariants } from "../../animations/variants.js";
import { useUser } from "../../context/UserProvider.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import ExpandableSearchBar from "../../components/ui/ExpandableSearchBar.jsx";


const MessageList = () => {

    const { token } = useAuth();

    const navigate = useNavigate();

    const { conversations, handleShowConversation, getUnreadMessageCount, countUnread } = useApp();
    const { friends, getFriends } = useUser();

    const { socket } = useSocketContext();

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
    }, []);

    useEffect(() => {
        socket?.on("newMessage", () => {
            handleShowConversation();
            getUnreadMessageCount();
        });

        return () => socket?.off("newMessage")

    }, [socket, countUnread])

    return (
        <motion.section className="flex flex-col items-center justify-start w-full gap-6 relative  min-h-screen" variants={appVariants} initial="hidden" whileInView="visible" viewport={{once : true}}>
                <SubHeader name={"Messages"} icon={"bi bi-chat"} rightContent={<ExpandableSearchBar setValue={setSearch} placeholder={"Rechercher un ami"} value={search}/>}/>
            <div
                className="w-full h-fit bg-white-100 dark:bg-black-100 dark:border-none flex justify-start overflow-x-scroll p-4 border border-black-0 rounded-2xl scrollbar-none ">
                {friends.length > 0 ?
                    friends.map(friend => (
                        <ActiveUser key={friend.userid} friend={friend}/>
                    )) :
                    <div>
                        <Button icon="bi bi-plus-lg" onClick={() => navigate("/friend")}>Ajouter un ami</Button>
                    </div>
                }
            </div>

            {/* <SearchBar variant={"fill"} block size={"lg"} value={search} setValue={setSearch} placeholder={"Rechercher un ami"} /> */}

            <div className="w-full h-[60vh] scrollbar-none overflow-y-scroll bg-white-100 dark:bg-white-0 dark:border-none  flex flex-col gap-3 overflow-hidden p-2  rounded-xl border border-black-0">
                {
                    search ?
                        SearchFriends?.length > 0 ?
                            SearchFriends.map(conversation => (
                                <Conv key={conversation.userid} id={conversation.userid} userToChat={conversation} />
                            )
                            )
                            :
                            <p className="nothing-box">
                                Aucun resultat
                            </p>
                        :
                        conversations.length > 0 ?
                    conversations.map(conversation => (
                            <Conv key={conversation.userid} id={conversation.userid} userToChat={conversation}/>
                        )
                    )
                    :
                            <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
                                Commencez une Conversation
                    </p>
                }
            </div>
        </motion.section>
    )
}
export default MessageList;
