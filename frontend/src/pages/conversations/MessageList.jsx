import {Button} from "../../styles/components";
import  {useEffect} from "react";
import {useAuth} from "../../context/AuthProvider";
import {useApp} from "../../context/AppPorvider";
import {useSocketContext} from "../../context/SocketContext";
import ActiveUser from "../../components/pages/conversations/ActiveUser.jsx";
import {SubHeader} from "../../components/pages/SubHeader.jsx";
import SearchBar from "../../components/ui/SearchBar.jsx";
import ProfileImage from "../../assets/images/OIP.jpg";
import Conv from "../../components/pages/conversations/Conversation.jsx";
import {motion} from "framer-motion";
import {appVariants} from "../../animations/variants.js";


const MessageList = () => {

    const {token} = useAuth();

    const {conversations, handleShowConversation, friends, handleFriends} = useApp();

    const {socket} = useSocketContext();

    const {messages, setMessages} = useApp();

    useEffect(() => {

        handleFriends();
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
                className="w-full h-fit bg-white-100 dark:bg-black-100 dark:border-none flex justify-start overflow-auto p-4 border border-black-0 rounded-2xl scrollbar-none ">
                {friends.length > 0 ?
                    friends.map(friend => (
                        <ActiveUser key={friend.userid} friend={friend}/>
                    )) :
                    <div>
                        <Button icon="bi bi-plus-lg">Ajouter un ami</Button>
                    </div>
                }
            </div>
            <SearchBar variant={"fill"} block size={"lg"} placeholder={"Rechercher un ami"}/>
            <div className="w-full  h-[70%] bg-white-100 dark:bg-black-10 dark:border-none  flex flex-col gap-4 overflow-hidden p-4  rounded-xl border border-black-0">
                {conversations.length > 0 ?
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

const DiscussionCard = ({profileImage, messageSeen, fullName, accountType, lastMessage, lastMessageTime}) => {

    return (
    <div className={"flex items-center justify-between cursor-pointer w-full hover:bg-primary-20 p-6 rounded-xl"}>
    <div className="flex items-center gap-2">
        <img className="size-[40px] object-cover rounded-full" src={ProfileImage}/>
        <div className="flex flex-col gap-1 items-start">
            <p className="text-black-100 text-small-1">RAHARISOA Haingonirina (Client)</p>
            <p className={"text-black-100 font-bold text-small-1"}>
                Lorem ipsum dolor sit amet
            </p>
        </div>
    </div>
    <div className="flex items-center gap-1">
        <div className="size-[10px] rounded-full bg-primary-100"
        ></div>
        <p className={"text-small-2 text-black-80 font-light"}>Il y a 10 min</p>
    </div>
</div>
)
}