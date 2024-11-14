import {USERS_FILTERS} from "../constants/index.js";
import {useCallback} from "react";

const useUsersFilter = () => {
    const updateActiveUserFilter = (filter) => {
        localStorage.setItem("activeUserFilters", filter);
    }

    const filterUsers = useCallback((search, friends, users) => {
        const activeUserFilter = localStorage?.getItem("activeUserFilters") || USERS_FILTERS.follower;

        switch (activeUserFilter) {
            case USERS_FILTERS.suggestion: {
                updateActiveUserFilter(USERS_FILTERS.suggestion);
                if (!search) return users;
                if (users.length > 0) return users.filter(user =>

                    user?.firstname?.toLowerCase().includes(search.toLowerCase()) ||
                    user?.lastname?.toLowerCase().includes(search.toLowerCase())
                );
            }

            case USERS_FILTERS.follower: {
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
    },[]);
    
    return {filterUsers};
}

export default useUsersFilter;