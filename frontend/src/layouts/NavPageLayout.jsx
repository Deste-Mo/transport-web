import { Outlet } from "react-router-dom";
import { ProfileLeft } from "../components/pages/ProfileLeft.jsx";
import { SubHeader } from "../components/pages/SubHeader.jsx";
import RecentlyFriends from "../components/pages/RecentlyFriends.jsx";
import SavePublication from "../components/pages/SavePublication.jsx";
import { Notification } from "../components/pages/Notification.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import { SERVERLINK } from "../constants/index.js";
import { useApp } from "../context/AppPorvider.jsx";
import { useEffect } from "react";

const NavPageLayout = () => {
    const { personalInformation } = useAuth();
    const user = personalInformation;


    const { friends, handleFriends, handleOfferSuggestion, suggestions } = useApp();

/*    useEffect(() => {
        handleFriends();
        handleOfferSuggestion();

        // console.log(suggestions);
    }, [friends, handleFriends]);*/

    return (
        <section className="flex items-start  w-full justify-between nav-page-container gap-10">
            {/*Left subNav*/}
            <div
                className="flex flex-col gap-10 overflow-x-hidden basis-[26%] overflow-y-scroll max-h-[100vh] scrollbar-none">
                <ProfileLeft name={user?.fullName} image={SERVERLINK + "/" + user?.profile} account={user?.accounttype} />
                <div className="flex flex-col gap-3">
                    <SubHeader name="Amis recemment" icon="bi bi-person" />
                    <div className="flex flex-col gap-3 rounded-lg p-4 bg-white-100">
                        {
                            friends.length > 0 ?
                                friends.map(friend => (
                                    <RecentlyFriends className="w-full" key={friend.userid} spec={friend.userid} name={friend.firstname + " " + friend.lastname} image={SERVERLINK + "/" + friend.profileimage} />
                                )) :
                                <div>No friends</div>
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <SubHeader name="Publication Souvegarder" icon="bi bi-person" />
                    {
                        suggestions.map(suggestion =>
                            (<SavePublication key={suggestion.offerid} capacity={suggestion.capacity} title={suggestion.title} depart={suggestion.depart} destination={suggestion.dest} scheduleddate={suggestion.scheduleddate} />)
                        )
                    }
                </div>
            </div>

            {/*Center */}
            <div
                className="overflow-x-hidden overflow-y-scroll max-h-[100vh] basis-[44%] scrollbar-none rounded-xl">
                <Outlet />
            </div>

            {/*Right subNav*/}
            <div
                className=" max-h-[100vh] flex flex-col gap-10 overflow-x-hidden basis-[26%] scrollbar-none">
                <div className="flex flex-col gap-3">
                    <SubHeader name="Notification" icon="bi bi-bell" />
                    {
                        [1, 2, 3, 4].map(item =>
                            <Notification key={item} propos="Decouvrir les nouvelle fonctionallites" time={15 + " minutes"} />
                        )
                    }
                </div>
                <div className="flex flex-col gap-3">
                    <SubHeader name="Sugfestions d'offres" icon="bi bi-robot" />
                    {
                        suggestions.map(suggestion => 
                            (<SavePublication key={suggestion.offerid} capacity={suggestion.capacity} title={suggestion.title} depart={suggestion.depart} destination={suggestion.dest} scheduleddate={suggestion.sheduleddate} />)
                        )
                    }
                </div>
            </div>

        </section>
    )
}

export default NavPageLayout;