import {createContext, useContext, useState} from "react";
import {SERVERLINK} from "../constants/index.js";
import {useAuth} from "./AuthProvider.jsx";
import axios from "axios";

const FriendContext = createContext({});

const UserProvider = ({children}) => {
    const {token} = useAuth();
    
    const [friends, setFriends] = useState([]);
    const [loadingFriend, setLoadingFriend] = useState(true);
    const [users, setUsers] = useState([]);
    const [profileFriends, setProfileFriends] = useState([]);
    const [followersCount, setFollowersCount] = useState(0);
    const [friendFollowerCount, setFriendFollowerCount] = useState(0);
    
    const getFriends = async (userId) => {
        const response = await axios.get(`${SERVERLINK}/api/profile/friends/${!userId ? '' : userId}`, {
            headers: { token }
        })

        setFriends(response?.data?.friends);
        setFollowersCount(await response?.data.friends.length);
        setFriendFollowerCount(await response?.data.profile.length);
        setProfileFriends(await response?.data.profile);
    }
    const getUsers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/messages/users`, { headers: { token } })
        setUsers(await response?.data?.allUsers);
    }
    const unFollowUsers = async (id) => {
        const response = await fetch(SERVERLINK + "/api/profile/unfollow/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });

        getFriends(id);
        getUsers();
    };

    const followUser = async (id, me) => {

        const content = me.fullName + " Vous suit desormais.";

        const response = await fetch(SERVERLINK + "/api/profile/follow/" + id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        const sendNotifs = await fetch(SERVERLINK + '/api/notifs/sendnotifs/' + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify({ content })
        });
        getFriends(id);
        getUsers();
    };
    
  return (
        <FriendContext.Provider value={
            {
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
            }}>
        {children}
      </FriendContext.Provider>
  )
} 

export default UserProvider;

export const useUser = ()=> useContext(FriendContext);