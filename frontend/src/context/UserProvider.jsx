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
    const [followersCount, setFollowersCount] = useState(0);
    
    
    const getFriends = async () => {
        setLoadingFriend(true);
        const response = await axios.get(`${SERVERLINK}/api/profile/friends`, {
            headers: {token}
        })
        setFriends(await response?.data?.friends);
        setLoadingFriend(false);
    }
    const getUsers = async () => {
        const reponse = await axios.get(`${SERVERLINK}/api/messages/users`, {headers: {token}})
        
        setUsers(await reponse?.data?.allUsers);
    }
    const getFollowersCount = async () => {
        const response = await axios.get(`${SERVERLINK}/api/profile/countfollow`, {headers : {token}});
        setFollowersCount(await response?.data?.count);
    }
    
    const handleUsersToShow = async () => {
        // TODO: Forget the usage
    }
    
  return (
      <FriendContext.Provider value={{friends, followersCount,users,loadingFriend,handleUsersToShow, getFriends, getUsers, getFollowersCount}}>
        {children}
      </FriendContext.Provider>
  )
} 

export default UserProvider;

export const useUser = ()=> useContext(FriendContext);