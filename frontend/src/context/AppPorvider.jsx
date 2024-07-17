import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthProvider";
import { SERVERLINK } from "../constants";
const AppContext = createContext({});

const AppProvider = ({ children }) => {

    const { token } = useAuth()

    const [userToChat, setUserToChat] = useState({
        id: null,
        fullName: null,
        accountType: null,
        pic: null
    });

    const [users, setUsers] = useState([]);


    const [conversations, setConversations] = useState([]);

    const [friends, setFriends] = useState([]);

    const [countFollow, setCountFollow] = useState(0);

    const [countUnread, setCountUnread] = useState(0)

    const [messages, setMessages] = useState([]);

    const handleShowConversation = async () => {

        const conversationsRes = await fetch(SERVERLINK + '/api/messages/conversation', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const allConversations = await conversationsRes.json();

        setConversations(await allConversations.conversations);
    }

    const handleUsersToShow = async () => {
        const conversationsRes = await fetch(SERVERLINK + '/api/messages/users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const allUsers = await conversationsRes.json();

        setUsers(await allUsers.allUsers);
    }

    const handleFriends = async () => {
        const conversationsRes = await fetch(SERVERLINK + '/api/profile/friends', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const allFriends = await conversationsRes.json();

        console.log(allFriends.friends);

        setFriends(await allFriends.friends);
    }

    const handleCountUnread = async () => {

        const conversationsRes = await fetch(SERVERLINK + '/api/messages/count', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const count = await conversationsRes.json();

        console.log(count.unread);

        setCountUnread(await count.unread);
    }

    const handleCountFollow = async () => {

        const conversationsRes = await fetch(SERVERLINK + '/api/profile/countfollow', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const count = await conversationsRes.json();

        console.log(count.count);

        setCountFollow(await count.count);
    }


    return <AppContext.Provider value={{
        userToChat,
        setUserToChat,
        messages,
        setMessages,
        users,
        setUsers,
        conversations,
        setConversations,
        handleShowConversation,
        handleUsersToShow,
        friends,
        setFriends,
        handleFriends,
        countUnread,
        setCountUnread,
        handleCountUnread,
        setCountFollow,
        countFollow,
        handleCountFollow
    }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;

export const useApp = () => {
    return useContext(AppContext);
}

