import { useAuth } from "../context/AuthProvider.jsx";
import { SubHeader } from "../components/pages/SubHeader.jsx";
import RecentlyFriends from "../components/pages/RecentlyFriends.jsx";
import { useEffect, useState } from "react";
import { SERVERLINK } from "../constants/index.js";
import { appVariants } from "../animations/variants.js";
import { motion } from "framer-motion";
import ExpandableSearchBar from "../components/ui/ExpandableSearchBar.jsx";
import { useUser } from "../context/UserProvider.jsx";

const Friends = () => {
    const { personalInformation } = useAuth();
    const user = personalInformation;
    const { friends, getFriends, getUsers, users } = useUser();

    const [search, setSearch] = useState('');

    const [followers, setFollowers] = useState(users);

    const handleFollower = () => { setFollowers(friends) }

    const handleUsers = () => { setFollowers(users) }

    const SearchFriends = followers.length > 0 ? (followers.filter(friend => {
        let fullname = friend.firstname.toLowerCase() + " " + (friend.lastname ? friend.lastname.toLowerCase() : '');
        let accountType = friend.accounttype.toLowerCase();
        if (search && (!fullname.includes(search.toLowerCase()) && (!accountType.includes(search.toLowerCase())))) {
            return false;
        }
        return true;
    })) : null;

    useEffect(() => {
        getUsers();
        getFriends();
    }, [])

    return (
        <motion.section className="flex flex-col items-center justify-center gap-6 w-full " variants={appVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SubHeader name="Suggestions" icon="bi bi-person-fill"
                rightContent={<ExpandableSearchBar setValue={setSearch} value={search} />} />
            <div className="flex w-full justify-start items-start gap-x-6 gap-y-2 flex-wrap">
                <OfferDetailBadge text="Amis" icon="bi bi-box" onClick={handleFollower}/>
                <OfferDetailBadge text="Sugsestion d'amis" icon="bi bi-map" onClick={handleUsers}/>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 p-4 w-full bg-white-100 dark:bg-black-100 rounded-xl">
                {
                    search ?
                        SearchFriends?.length > 0 ?
                            SearchFriends?.map(friend => (
                                <RecentlyFriends className="w-full" key={friend.userid} spec={friend.userid}
                                    account={friend.accounttype} name={friend.firstname + (friend.lastname ? (" " + friend.lastname) : '')}
                                    image={SERVERLINK + "/" + friend.profileimage} showMessageButton
                                    showAddFriendButton
                                    showProfileButton={false} />
                            )
                            )
                            :
                            <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
                                Aucun resultat
                            </p>
                        :
                        followers.length > 0 ?
                            followers == friends?
                            followers.map(friend => (
                                <RecentlyFriends className="w-full" key={friend.userid} spec={friend.userid}
                                    account={friend.accounttype} name={friend.firstname + (friend.lastname ? (" " + friend.lastname) : '')}
                                    image={SERVERLINK + "/" + friend.profileimage} showMessageButton
                                    showRemoveFriendButton
                                    showProfileButton={false} />
                            ))
                            :
                            followers.map(friend => (
                                <RecentlyFriends className="w-full" key={friend.userid} spec={friend.userid}
                                    account={friend.accounttype} name={friend.firstname + (friend.lastname ? (" " + friend.lastname) : '')}
                                    image={SERVERLINK + "/" + friend.profileimage} showMessageButton
                                    showAddFriendButton
                                    showProfileButton={false} />
                            ))
                            :
                            <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
                                Aucune Suggestion Follower
                            </p>
                }
            </div>
        </motion.section>
    );
};

const OfferDetailBadge = ({icon, text, onClick}) => {
    return (
        <div className=" text-small-2 rounded-full px-4 py-2 bg-primary-20 flex gap-2 cursor-pointer border border-primary-20 hover:bg-primary-80 group dark:hover:bg-primary-40 dark:text-white-100 dark:bg-primary-10" onClick={onClick}>
            <i className={`${icon} text-primary-100 dark:group-hover:text-white-100 group-hover:text-black-100`}></i>
            <p>{text}</p>
        </div>
    )
}


export default Friends;
