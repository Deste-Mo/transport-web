/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthProvider";
import { SERVERLINK } from "../constants";
import axios from "axios";
import {useAnimation} from "./AnimationProvider.jsx";
const AppContext = createContext({});

const AppProvider = ({ children }) => {

    const { token } = useAuth()
    const {setShowConfirmPopup} = useAnimation();

    const [userToChat, setUserToChat] = useState({
        id: null,
        fullName: null,
        accountType: null,
        pic: null
    });
    const [conversations, setConversations] = useState([]);
    const [countUnread, setCountUnread] = useState(0)
    const [messages, setMessages] = useState([]);
    
    // Confirm message popup
    const [confirmPopup, setConfirmPopup] = useState({
        message :  "Some message ?",
        confirmed : false,
    });
    const setConfirmMessagePopup = (message) => {
        setConfirmPopup({
            message,
            confirmed : false,
        })
        setShowConfirmPopup(true);
        return confirmPopup.confirmed;
    }
    
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
    const getUserMessages = async (endOfMessagesRef) => {

        const scrollToBottom = () => {
            endOfMessagesRef.current?.scrollIntoView();
        };

        const user = await JSON.parse(localStorage.getItem('userToChat'));

        setUserToChat({
            id: user.id,
            fullName: user.fullName,
            accountType: user.accounttype,
            pic: user.pic
        })

        const messagesRes = await fetch(SERVERLINK + '/api/messages/' + await user.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const allMessages = await messagesRes.json();

        setMessages(await allMessages.messages);

        scrollToBottom();

    }

    const getUnreadMessageCount = async () => {

        const conversationsRes = await fetch(SERVERLINK + '/api/messages/count', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const count = await conversationsRes.json();

        setCountUnread(await count.unread);
    }

    const timeSince = (date, max) => {
        const now = new Date();
        const secondsPast = Math.floor((now - new Date(date)) / 1000);
        const maximum = max * 24 * 3600;

        if (secondsPast < 60) {
            return `il y a ${secondsPast} secondes`;
        }
        if (secondsPast < 3600) {
            return `il y a ${Math.floor(secondsPast / 60)} minutes`;
        }
        if (secondsPast < 86400) {
            return `il y a ${Math.floor(secondsPast / 3600)} heures`;
        }
        if (secondsPast < maximum) { // selon le nombre de jour voulu
            return `il y a ${Math.floor(secondsPast / 86400)} jours`;
        }

        return new Date(date).toLocaleDateString();
    };

    
    return <AppContext.Provider value={{
        // CONVERSATION
        getUserMessages,
        userToChat,
        setUserToChat,
        messages,
        setMessages,
        getUnreadMessageCount,
        conversations,
        setConversations,
        timeSince,
        handleShowConversation,
        countUnread,
        setCountUnread,
        
        // Confirm Popup
        confirmPopup,
        setConfirmPopup,
        setConfirmMessagePopup


    }}>
        {children}
    </AppContext.Provider>
}
export default AppProvider;

export const useApp = () => {
    return useContext(AppContext);
}

