/* eslint-disable no-unused-vars */
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

    const [suggestions, setSuggestions] = useState([]);

    const [homeoffers, setHomeoffers] = useState([]);
    
    const [allOffers, setAllOffers] = useState([]);

    const [notifications, setNotifications] = useState([]);

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


    const handleNotificationShow = async () => {

        const notificationsRes = await fetch(SERVERLINK + '/api/notifs/getnotifs', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const allNotifs = await notificationsRes.json();

        setNotifications(await allNotifs.notifications);
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

    const handleShown = async (endOfMessagesRef) => {

        const scrollToBottom = () => {
            endOfMessagesRef.current?.scrollIntoView();
        };

        const user = await JSON.parse(localStorage.getItem('userToChat'));

        setUserToChat({
            id: user.id,
            fullName: user.fullName,
            accountType: user.accountType,
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

    const handleFriends = async () => {
        const conversationsRes = await fetch(SERVERLINK + '/api/profile/friends', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const allFriends = await conversationsRes.json();

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

        setCountFollow(await count.count);
    }

    const handleOfferSuggestion = async () => {

        const sugRes = await fetch(SERVERLINK + '/api/offres/suggestionoffers', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        const suggestionsRes = await sugRes.json();

        setSuggestions(await suggestionsRes.suggestions);
    }

    const handleHomeOffers = async () => {

        const homeRes = await fetch(SERVERLINK + '/api/offres/gethomepageoffers', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const homeoffersRes = await homeRes.json();

        setHomeoffers(await homeoffersRes.offers);
    }

    const handleOffersForUser = async () => {

        console.log("My token: " + token)

        const homeRes = await fetch(SERVERLINK + '/api/offres/allofferforuser', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const offerRes = await homeRes.json();

        console.log(await offerRes)

        setAllOffers(await offerRes.all);
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
        if (secondsPast < maximum) { // 7 jours
            return `il y a ${Math.floor(secondsPast / 86400)} jours`;
        }

        return new Date(date).toLocaleDateString();
    };


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
        handleCountFollow,
        suggestions,
        setSuggestions,
        handleOfferSuggestion,
        notifications,
        setNotifications,
        handleNotificationShow,
        handleShown,
        homeoffers,
        setHomeoffers,
        handleHomeOffers,
        timeSince,
        handleOffersForUser,
        allOffers,
        setAllOffers
    }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider;

export const useApp = () => {
    return useContext(AppContext);
}

