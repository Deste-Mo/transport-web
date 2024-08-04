import {useAuth} from "../context/AuthProvider.jsx";
import {SubHeader} from "../components/pages/SubHeader.jsx";
import RecentlyFriends from "../components/pages/RecentlyFriends.jsx";
import {useApp} from "../context/AppPorvider.jsx";
import {useEffect} from "react";
import {SERVERLINK} from "../constants/index.js";
import {Icon} from "../styles/components.js";
import {appVariants} from "../animations/variants.js";
import {motion} from "framer-motion";
import ExpandableSearchBar from "../components/ui/ExpandableSearchBar.jsx";

const Friends = () => {
    const {personalInformation, logout, setRegistrationStep} = useAuth();
    const user = personalInformation;

    const {users, handleUsersToShow, friends, handleFriends} = useApp();

    useEffect(() => {
        handleUsersToShow();
        handleFriends();
    }, [])

    return (
        <motion.section className="flex flex-col items-center justify-center gap-6 w-full " variants={appVariants} initial="hidden" whileInView="visible" viewport={{once : true}}>
            <SubHeader name="Amis" icon="bi bi-person-fill"
                       rightContent={<ExpandableSearchBar/>}/>
            <div className="flex flex-col items-center justify-center gap-6 p-4 w-full bg-white-100 dark:bg-black-100 rounded-xl">
                {friends.length > 0 ?
                    friends.map(friend => (
                        <RecentlyFriends className="w-full" key={friend.userid} spec={friend.userid}
                                         account={friend.accounttype} name={friend.firstname + " " + friend.lastname}
                                         image={SERVERLINK + "/" + friend.profileimage} showMessageButton
                                         showRemoveFriendButton/>
                    ))
                    :
                    <div>Pas d'ami</div>
                }
            </div>
        </motion.section>
    );
};

export default Friends;
