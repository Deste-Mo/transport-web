import {createContext, useContext, useEffect} from "react";
import useUserHook from "../hooks/useUserHook.js";
import {useAuth} from "./AuthProvider.jsx";
import useFollowersHook from "../hooks/useFollowersHook.js";
import useSuggestedUserHook from "../hooks/useSuggestedUserHooks.js";
import {USERS_FILTERS} from "../constants/index.js";
import useUsersFilter from "../hooks/useUsersFilter.js";

const NewUserContext = createContext({});

const NewUserProvider = ({children}) => {
    const {token} = useAuth();

    const {error: userError, loading: isFetchingUser, user,...userProps} = useUserHook({});
    const {error: followersError, loading: isFetchingFollowers,followers , ...followersProps} = useFollowersHook();
    const {
        error: suggestedUsersError,
        loading: isFetchingSuggestedUser,
        suggestedUsers,
        ...suggestedUsersProps
    } = useSuggestedUserHook();
    
    const {filterUsers} = useUsersFilter();


    // FUNCTION ADAPTERS 
    const fetchUser = () => userProps.fetchUser(token);

    const fetchFollowers = (userId) => followersProps.fetchFollowers(userId, token);
    const removeFollower = (followerId, userId) => followersProps.removeFollower(followerId, userId, token);
    const followUser = (targetId, userId, me) => followersProps.followUser(targetId, userId, me, token);


    const fetchSuggestedUser = () => suggestedUsersProps.fetchSuggestedUsers(token);

    
    
    

    return (
        <NewUserContext.Provider value={{
            // UserProps
            user,
            fetchUser,
            userError,
            isFetchingUser,
            
            // FollowerProps
            followers,
            fetchFollowers,
            removeFollower,
            followUser,
            isFetchingFollowers,
            followersError,
            
            // SuggestedUserProps
            suggestedUsers,
            fetchSuggestedUser,
            isFetchingSuggestedUser,
            suggestedUsersError,
            
            // Filtering user
            filterUsers
        }}>
            {children}
        </NewUserContext.Provider>
    )
}

export const useNewUserContext = () => {
    const context = useContext(NewUserContext);

    if (!context)
        throw new Error("useNewUserContext must be used within context");

    return context;
}

export default NewUserProvider;
