import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {SubHeader} from "../components/pages/SubHeader.jsx";
import RecentlyFriends from "../components/pages/RecentlyFriends.jsx";
import {useAuth} from "../context/AuthProvider.jsx";
import {SERVERLINK, USERS_FILTERS} from "../constants/index.js";
import {Suspense, lazy, useEffect} from "react";
import {NAVIGATIONS} from "../constants/home.js";
import {Button, Icon} from "../styles/components.js";
import OfferCard from "../components/pages/Offer/OfferCard.jsx";
import {useOffer} from "../context/OfferProvider.jsx";
import {useUser} from "../context/UserProvider.jsx";
import ProfileLeftLoading from "../components/loader/ProfileLeftLoading.jsx";
import {useAnimation} from "../context/AnimationProvider.jsx";
import useWindowSize from "../hooks/useWindowSize.jsx";

const ProfileLeft = lazy(() => import("../components/pages/profile/ProfileLeft.jsx"));

const NavPageLayout = () => {
    const {personalInformation} = useAuth();
    const {setShowBackIcon, hideMobileNavigation, setHideMobileNavigation} = useAnimation();
    const [width] = useWindowSize();
    const {
        savedOffers,
        getSavedOffers,
        suggestedOffers,
        getCurrentUserOffers,
        getSuggestedOffers,
    } = useOffer();

    const user = personalInformation;
    const pathname = useLocation().pathname;
    
    
    useEffect(() => {
        getSavedOffers();
        getSuggestedOffers();
        getCurrentUserOffers();
        setShowBackIcon(false);

    }, []);
    
    useEffect(() => {
        setHideMobileNavigation(false);
    }, [pathname])
    
    return (
        <section
            className={`flex items-start  w-full justify-between nav-page-container gap-10 h-[86vh]  scrollbar-none relative ${hideMobileNavigation ? 'max-md:h-screen overflow-hidden' : 'max-md:h-[80vh]'} `}>
            <div
                className="flex flex-col max-[1070px]:hidden basis-[26%]  items-start justify-start gap-10 overflow-x-hidden overflow-y-scroll max-h-full scrollbar-none relative">
                <Suspense fallback={<ProfileLeftLoading/>}>
                    <ProfileLeft
                        id={user.id}
                        name={user?.fullName}
                        image={SERVERLINK + "/" + user?.profile}
                        account={user?.accounttype}
                    />
                </Suspense>
                <div className="flex flex-col gap-3 w-full">
                    <DynamicLeftContent currentLocation={pathname}/>
                </div>
            </div>

            {/*Center */}
            <div
                className={`overflow-x-hidden  h-full max-h-full basis-[44%] max-[1070px]:basis-[60%] max-md:basis-full scrollbar-none rounded-xl ${hideMobileNavigation ? 'overflow-y-hidden' : 'overflow-y-scroll'}`}>
                <Outlet/>
            </div>

            {/*Right subNav*/}
            <div
                className="max-h-full flex flex-col gap-10 overflow-x-hidden basis-[26%] max-[1070px]:basis-[40%] max-md:hidden scrollbar-none">
                <div className="flex flex-col gap-4 w-full">
                    <SubHeader
                        name="Offres Sauvegardées"
                        icon="bi bi-person-fill"
                        size="md"
                    />
                    {savedOffers.length > 0 ? (
                        savedOffers.map((savedOffer) => (
                            <OfferCard
                                key={savedOffer.saveid}
                                sug={savedOffer}
                                saved
                                detailedProfile={false}
                            />
                        ))
                    ) : (
                        <p className="nothing-box">Pas de sauvegarde pour l'instant</p>
                    )}
                </div>
                <div className="flex flex-col gap-6">
                    <SubHeader name="Sugfestions d'offres" icon="bi bi-robot"/>
                    {suggestedOffers.length > 0 ? (
                        suggestedOffers.map((suggestion) => (
                            <OfferCard
                                detailedProfile={false}
                                key={suggestion.offerid}
                                sug={suggestion}
                                saved={
                                    savedOffers.length > 0
                                        ? savedOffers.find(
                                            (offer) => offer.offerid === suggestion.offerid
                                        )
                                        : false
                                }
                            />
                        ))
                    ) : (
                        <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
                            Pas de sauvegarde pour l'instant
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};
export default NavPageLayout;

const DynamicLeftContent = ({currentLocation}) => {
    const {friends, users, updateActiveUserFilter} = useUser();
    const navigate = useNavigate();


    switch (currentLocation) {
        case NAVIGATIONS.home:
            return (
                <>
                    <SubHeader name="Suivi(s)" icon="bi bi-broadcast"/>
                    <div className="flex flex-col gap-3 rounded-xl p-2 bg-white-100 dark:bg-white-0">
                        {friends.length > 0 ? (
                            friends.map((friend) => (
                                <RecentlyFriends
                                    className="w-full"
                                    key={friend.userid}
                                    spec={friend.userid}
                                    account={friend.accounttype}
                                    name={friend.firstname + " " + (friend.lastname ? friend.lastname : '')}
                                    image={SERVERLINK + "/" + friend.profileimage}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col gap-2">
                                <p className="nothing-box">Pas de suivi(s)</p>
                                <Button block icon="bi bi-plus-lg" onClick={() => {
                                    navigate("/friend");
                                    updateActiveUserFilter(USERS_FILTERS.suggestion)
                                }}>
                                    Voir les suggestions
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            );

        case NAVIGATIONS.friend:
            return (
                <>
                    <SubHeader name="Suggestion" icon="bi bi-broadcast"/>
                    <div
                        className="flex flex-col items-center justify-center gap-6 p-2 w-full bg-white-100 dark:bg-white-0 rounded-xl">
                        {users?.length > 0 ? (
                            users.map((user) => (
                                <RecentlyFriends
                                    className="w-full"
                                    key={user.userid}
                                    spec={user.userid}
                                    account={user.accounttype}
                                    name={user.firstname + " " + user.lastname}
                                    image={SERVERLINK + "/" + user.profileimage}
                                    showAddFriendButton
                                    showProfileButton={false}
                                />
                            ))
                        ) : (
                            <div className="nothing-box">Aucune Suggestion</div>
                        )}
                    </div>
                </>
            );

        default:
            return (
                <>
                    <SubHeader name="Suivi(s)" icon="bi bi-broadcast"/>
                    <div className="flex flex-col gap-3 rounded-xl p-2 bg-white-100 dark:bg-white-0">
                        {friends.length > 0 ? (
                            friends.map((friend) => (
                                <RecentlyFriends
                                    className="w-full"
                                    key={friend.userid}
                                    spec={friend.userid}
                                    account={friend.accounttype}
                                    name={friend.firstname + " " + friend.lastname}
                                    image={SERVERLINK + "/" + friend.profileimage}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col gap-2">
                                <p className="nothing-box">Pas de suivi(s)</p>
                                <Button block icon="bi bi-plus-lg" onClick={() => {
                                    navigate("/friend");
                                    updateActiveUserFilter(USERS_FILTERS.suggestion)
                                }}>
                                    Voir les suggestions
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            );
    }
};
