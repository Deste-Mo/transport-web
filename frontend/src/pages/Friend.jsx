import { lazy, useEffect, useState } from "react";

import { useAuth } from "../context/AuthProvider.jsx";
import { SubHeader } from "../components/pages/SubHeader.jsx";
import { useApp } from "../context/AppProvider.jsx";
import {
  SERVERLINK,
  USERS_FILTERS,
  USERS_FILTERS_DATAS,
} from "../constants/index.js";
import { appVariants } from "../animations/variants.js";
import { motion } from "framer-motion";
import ExpandableSearchBar from "../components/ui/ExpandableSearchBar.jsx";
import { useUser } from "../context/UserProvider.jsx";
import Badge from "../components/ui/Badge.jsx";
import { Suspense } from "react";
import FriendCardLoading from "../components/loader/FriendCardLoading.jsx";
const RecentlyFriends = lazy(() =>
    import("../components/pages/RecentlyFriends.jsx")
  );

const Friends = () => {
  const { personalInformation } = useAuth();
  const {
    friends,
    getFriends,
    getUsers,
    filterUsers,
    activeUserFilters,
    filteredUsers,
  } = useUser();

  const [search, setSearch] = useState("");

  const SearchFriends =
    filteredUsers.length > 0
      ? filteredUsers.filter((friend) => {
          let fullname =
            friend.firstname.toLowerCase() +
            " " +
            (friend.lastname ? friend.lastname.toLowerCase() : "");
          let accountType = friend.accounttype.toLowerCase();
          if (
            search &&
            !fullname.includes(search.toLowerCase()) &&
            !accountType.includes(search.toLowerCase())
          ) {
            return false;
          }
          return true;
        })
      : null;

  useEffect(() => {
    filterUsers(USERS_FILTERS.follower); // TODO : put the last filtered user in the localstorage
    getUsers();
    getFriends();
  }, []);

  return (
    <motion.section
      className="flex flex-col items-center justify-center gap-6 w-full "
      variants={appVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SubHeader
        name="Suivis"
        icon="bi bi-broadcast"
        rightContent={
          <ExpandableSearchBar block setValue={setSearch} value={search} />
        }
      />
      <div className="flex items-center gap-4">
        {activeUserFilters.map((userFilter) => (
          <Badge
            onClick={() => filterUsers(userFilter?.name)}
            key={userFilter?.name}
            text={userFilter?.name}
            active={userFilter?.active}
          />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-6 p-2 w-full bg-white-100 dark:bg-white-0 rounded-xl">
        {search ? (
          SearchFriends?.length > 0 ? (
            SearchFriends?.map((friend) => (
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
            <Suspense fallback={<FriendCardLoading />}>
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
