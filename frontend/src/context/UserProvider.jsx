import { createContext, useContext, useState } from "react";
import {
    SERVERLINK,
    USERS_FILTERS,
    USERS_FILTERS_DATAS,
    TOAST_TYPE
} from "../constants/index.js";
import {useAuth} from "./AuthProvider.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAnimation} from "./AnimationProvider.jsx";

const FriendContext = createContext({});

const UserProvider = ({ children }) => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [friends, setFriends] = useState([]);
    const [loadingFriend, setLoadingFriend] = useState(true);
    const [users, setUsers] = useState([]);
    const [profileFriends, setProfileFriends] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [friendFollowerCount, setFriendFollowerCount] = useState(0);
    const [activeUserFilters, setActiveUserFilters] =
        useState(USERS_FILTERS_DATAS);
    const [filteredUsers, setFilteredUsers] = useState(friends);

    const [subscriptionCards, setSubscriptionCards] = useState([]);

    const { setMessagePopup } = useAnimation();

    const getFriends = async (userId) => {
        const response = await axios.get(
            `${SERVERLINK}/api/profile/friends/${!userId ? "" : userId}`,
            {
                headers: {token},
            }
        );

        setFriends(await response?.data?.friends);
        setFollowersCount(await response?.data.friends.length);
        setFriendFollowerCount(await response?.data.profile.length);
        setProfileFriends(await response?.data.profile);
    };
    const getUsers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/messages/users`, {
            headers: { token },
        });
        setUsers(await response?.data?.allUsers);
    };
    const unFollowUsers = async (profileInfoId, id) => {
        await fetch(SERVERLINK + "/api/profile/unfollow/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });
        await getFriends(profileInfoId);
        await getUsers();
    };
    const goToUserProfile = (id) => {
        navigate(`/profile/${id}`);
    };
    const followUser = async (profileInfoId, id, me) => {
        const content = me.fullName + " Vous suit desormais.";

        await fetch(SERVERLINK + "/api/profile/follow/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });

        const sendNotifs = await fetch(
            SERVERLINK + "/api/notifs/sendnotifs/" + id,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify({content}),
            }
        );

        await getFriends(profileInfoId);
        await getUsers();
    };

    const updateActiveUserFilter = (filter) => {
        localStorage.setItem("activeUserFilters", filter);
    }
    const filterUsers = (search, friends, users) => {
        // Get the active filter from localStorage or default to 'follower'
        const activeUserFilter = localStorage?.getItem("activeUserFilters") || USERS_FILTERS.follower;


        switch (activeUserFilter) {
            case USERS_FILTERS.suggestion: {
                // localStorage.setItem("activeUserFilters", USERS_FILTERS.suggestion);
                updateActiveUserFilter(USERS_FILTERS.suggestion);
                if (!search) return users;
                if (users.length > 0) return users.filter(user =>
                    
                    user?.firstname?.toLowerCase().includes(search.toLowerCase()) ||
                    user?.lastname?.toLowerCase().includes(search.toLowerCase())
                );
            }

            case USERS_FILTERS.follower: {
                // localStorage.setItem("activeUserFilters", USERS_FILTERS.follower)
                updateActiveUserFilter(USERS_FILTERS.follower)
                if (!search) return friends;

                if (friends.length > 0)
                    return friends?.filter(friend =>
                        friend?.firstname?.toLowerCase().includes(search.toLowerCase()) ||
                        friend?.lastname?.toLowerCase().includes(search.toLowerCase())
                    );
            }

            default: {
                // localStorage.setItem("activeUserFilters", USERS_FILTERS.follower);
                updateActiveUserFilter(USERS_FILTERS.follower)
                return friends;
            }
        }
    };

    const handleSendEmailConf = async (id, subid) => {
        const response = await fetch(SERVERLINK + '/api/subscribtion/sendconfirm/' + id + '/' + subid, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const verification = await response.json();

        setMessagePopup(await verification.message, TOAST_TYPE.success);

    }

    const getAllSubscription = async () => {
        const response = await fetch(SERVERLINK + '/api/subscribtion/allsubscribtion', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const verification = await response.json();

        setSubscriptionCards(await verification.subscriptions)
        setMessagePopup(await verification.message, TOAST_TYPE.success);

    }

    const getUserExists = async (id) =>  {
        const response = await fetch(SERVERLINK + '/api/profile/exist/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const verification = await response.json();

        return verification;
    }

    return (
        <FriendContext.Provider
            value={{
                friends,
                followersCount,
                users,
                getFriends,
                getUsers,
                unFollowUsers,
                followUser,
                friendFollowerCount,
                profileFriends,
                setFriends,
                goToUserProfile,
                filterUsers,
                activeUserFilters,
                filteredUsers,
                updateActiveUserFilter,
                handleSendEmailConf,
                subscriptionCards,
                getAllSubscription,
                getUserExists
            }}
        >
            {children}
        </FriendContext.Provider>
    );
};

export default UserProvider;

export const useUser = () => useContext(FriendContext);
