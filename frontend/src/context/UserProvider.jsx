import {createContext, useContext, useState} from "react";
import {
    SERVERLINK,
    USERS_FILTERS,
    USERS_FILTERS_DATAS,
} from "../constants/index.js";
import {useAuth} from "./AuthProvider.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const FriendContext = createContext({});

const UserProvider = ({children}) => {
    const {token} = useAuth();

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
            headers: {token},
        });
        setUsers(await response?.data?.allUsers);
    };
    const unFollowUsers = async (profileInfoId, id) => {
        const response = await fetch(SERVERLINK + "/api/profile/unfollow/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });
        getFriends(profileInfoId);
        getUsers();
    };
    const goToUserProfile = (id) => {
        navigate(`/profile/${id}`);
    };
    const followUser = async (profileInfoId, id, me) => {
        const content = me.fullName + " Vous suit desormais.";

        const response = await fetch(SERVERLINK + "/api/profile/follow/" + id, {
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

        getFriends(profileInfoId);
        getUsers();
    };
    const filterUsers = (search, friends, users) => {
        const activeUserFilter = localStorage?.getItem("activeUserFilter") || USERS_FILTERS.follower;
        let newFilteredUsers = [];
        switch (activeUserFilter) {
            case USERS_FILTERS.suggestion:
                if (!search) return users;
                localStorage.setItem("activeUserFilter", USERS_FILTERS.suggestion);
                newFilteredUsers = users.filter((user) => {
                    return (
                        user.firstname.toLowerCase().includes(search.toLowerCase()) ||
                        user.lastname.toLowerCase().includes(search.toLowerCase())
                    );
                });
                break;
            case USERS_FILTERS.follower:
                if (!search) return friends;
                localStorage.setItem("activeUserFilter", USERS_FILTERS.follower);
                newFilteredUsers = friends.filter((friend) => {
                    return (
                        friend.firstname.toLowerCase().includes(search.toLowerCase()) ||
                        friend.lastname.toLowerCase().includes(search.toLowerCase())
                    )
                })
            default:
                newFilteredUsers = friends;
                break
        }
        
        return newFilteredUsers
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
            }}
        >
            {children}
        </FriendContext.Provider>
    );
};

export default UserProvider;

export const useUser = () => useContext(FriendContext);
