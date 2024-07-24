
import { useAuth } from "../context/AuthProvider.jsx";
import { SubHeader } from "../components/pages/SubHeader.jsx";
import RecentlyFriends from "../components/pages/RecentlyFriends.jsx";
import { useApp } from "../context/AppPorvider.jsx";
import { useEffect } from "react";
import { SERVERLINK } from "../constants/index.js";

const Friends = () => {
    const { personalInformation, logout, setRegistrationStep } = useAuth();
    const user = personalInformation;

    const { users, handleUsersToShow, friends, handleFriends } = useApp();

    useEffect(() => {
        handleUsersToShow();
        handleFriends();
    }, [])

    return (
        <section className="flex flex-col items-center justify-center gap-6 w-full pb-10">
            <SubHeader name="Amis" icon="bi bi-person" />
            <div className="flex flex-col items-center justify-center gap-6 p-4 w-full bg-white-100 rounded-xl">
                {friends.length > 0 ?
                    friends.map(friend => (
                        <RecentlyFriends className="w-full" key={friend.userid} spec={friend.userid} account={friend.accounttype} name={friend.firstname + " " + friend.lastname} image={SERVERLINK + "/" + friend.profileimage} message retire />
                    ))
                    :
                    <div>Pas d'ami</div>
                }
            </div>
            <SubHeader name="Suggestion d'amis" icon="bi bi-person" />
            <div className="flex flex-col items-center justify-center gap-6 p-4 w-full bg-white-100 rounded-xl">
                {
                    users.length > 0 ?
                    users.map(us => (
                        <RecentlyFriends className="w-full" key={us.userid} spec={us.userid} account={us.accounttype} name={us.firstname + " " + us.lastname} image={SERVERLINK + "/" + us.profileimage} message ajouter />
                    )):
                    <div>No availaible</div>
                }
            </div>
        </section>
    );
};

export default Friends;
