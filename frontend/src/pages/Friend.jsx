import {lazy, useEffect, useState} from "react";

import {useAuth} from "../context/AuthProvider.jsx";
import {SubHeader} from "../components/pages/SubHeader.jsx";
import {useApp} from "../context/AppProvider.jsx";
import {
    SERVERLINK,
    USERS_FILTERS,
    USERS_FILTERS_DATAS,
} from "../constants/index.js";
import {appVariants} from "../animations/variants.js";
import {motion} from "framer-motion";
import ExpandableSearchBar from "../components/ui/ExpandableSearchBar.jsx";
import {useUser} from "../context/UserProvider.jsx";
import Badge from "../components/ui/Badge.jsx";
import {Suspense} from "react";
import FriendCardLoading from "../components/loader/FriendCardLoading.jsx";

const RecentlyFriends = lazy(() =>
    import("../components/pages/RecentlyFriends.jsx")
);

const Friends = () => {
    const {personalInformation} = useAuth();
    const {
        friends,
        users,
        getFriends,
        getUsers,
        filterUsers,
    } = useUser();

    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUser] = useState([]);
    const [activeUserFilters, setActiveUserFilters] = useState(USERS_FILTERS_DATAS);
    

    const updateActiveUserFilters = (filterName) => {
        setActiveUserFilters((prevFilters) =>
            prevFilters.map((filter) => ({
                name: filter.name,
                active: filter.name === filterName,
            }))
        );
    }
    
    useEffect(() => {
        setFilteredUser(filterUsers(search, friends, users));
    }, [search])

    useEffect(() => {
        updateActiveUserFilters(localStorage?.getItem("activeUserFilters") || USERS_FILTERS.follower)
        getUsers();
        getFriends();
    }, []);

    return (
        <motion.section
            className="flex flex-col items-center justify-center gap-6 w-full "
            variants={appVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
        >
            <SubHeader
                name="Suivis"
                icon="bi bi-broadcast"
                rightContent={
                    <ExpandableSearchBar block setValue={setSearch} value={search}/>
                }
            />
            <div className="flex items-center gap-4">
                {activeUserFilters.map((userFilter) => (
                    <Badge
                        onClick={() => {
                            updateActiveUserFilters(userFilter?.name);
                            setFilteredUser(filterUsers(search, friends, users));
                        }}
                        key={userFilter?.name}
                        text={userFilter?.name}
                        active={userFilter?.active}
                    />
                ))}
            </div>
            <div
                className="flex flex-col items-center justify-center gap-6 p-2 w-full bg-white-100 dark:bg-white-0 rounded-xl">
                {search ? (
                    filteredUsers?.length > 0 ? (
                        filteredUsers?.map((friend) => (
                            <RecentlyFriends
                                className="w-full"
                                key={friend.userid}
                                spec={friend.userid}
                                account={friend.accounttype}
                                name={friend.firstname + " " + friend.lastname}
                                image={SERVERLINK + "/" + friend.profileimage}
                                showMessageButton
                                showRemoveFriendButton
                            />
                        ))
                    ) : (
                        <p className="nothing-box">Aucun resultat</p>
                    )
                ) : filteredUsers?.length > 0 ? (
                    filteredUsers?.map((friend) => (
                        <Suspense fallback={<FriendCardLoading/>}>
                            <RecentlyFriends
                                className="w-full"
                                key={friend.userid}
                                spec={friend.userid}
                                account={friend.accounttype}
                                name={friend.firstname + " " + friend.lastname}
                                image={SERVERLINK + "/" + friend.profileimage}
                                showMessageButton
                                showRemoveFriendButton

                            />
                        </Suspense>
                    ))
                ) : (
                    <div className="nothing-box">Pas d'ami</div>
                )}
            </div>
        </motion.section>
    );
};

export default Friends;
