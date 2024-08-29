import {lazy, Suspense, useEffect, useState} from 'react'
import {useAuth} from '../../context/AuthProvider'
import {Button, Icon} from '../../styles/components'
import {SubHeader} from './../../components/pages/SubHeader'
import RecentlyFriends from './../../components/pages/RecentlyFriends'
import {CURRENT_USER_OFFER_FILTERS, SERVERLINK, USERS_FILTERS} from '../../constants'
import OfferCard from '../../components/pages/Offer/OfferCard.jsx'
import {useNavigate, useParams} from 'react-router-dom'
import {useUser} from '../../context/UserProvider.jsx'
import {useOffer} from '../../context/OfferProvider.jsx'
import Offers from '../Offers.jsx'
import ProfileCardLoading from '../../components/loader/ProfileCardLoading.jsx'
import TemplatePopup, {
    OptionItem,
} from '../../components/ui/TemplatePopup.jsx'
import Filter from "../../components/ui/Filter.jsx";
import OfferCardLoading from "../../components/loader/OfferCardLoading.jsx";

const ProfileCard = lazy(() =>
    import('../../components/pages/profile/ProfileCard.jsx'),
)

export default function Profile() {
    const {id} = useParams()
    const navigate = useNavigate()
    const {updateActiveUserFilter} = useUser()
    const {personalInformation, getInformation, token, profileInfo} = useAuth()
    const {
        getFriends,
        followersCount,
        friendFollowerCount,
        profileFriends,
        friends,
    } = useUser();
    const {
        getSavedOffers,
        savedOffers,
        currentUserOffers,
        getCurrentUserOffers,
        filterCurrentUserOffers,
    } = useOffer();

    const handleSeeUsers = (userType = USERS_FILTERS.follower) => {
        updateActiveUserFilter(userType);
        navigate("/friend");
    }
    const [popupVisible, setPopupVisible] = useState(false);
    const [filteredCurrentUserOffer, setFilteredCurrentUserOffer] = useState(currentUserOffers);


    useEffect(() => {
        getSavedOffers();
    }, [])

    useEffect(() => {
        setFilteredCurrentUserOffer(filterCurrentUserOffers(currentUserOffers));
    }, [currentUserOffers])

    useEffect(() => {
        getFriends(id)
        if (localStorage.getItem('offerNotifId') !== null) {
            let offerid = localStorage.getItem('offerNotifId')
            getCurrentUserOffers(id, offerid)
        } else {
            getCurrentUserOffers(id)
        }
        getInformation(token, id)
    }, [id])

    return (
        <div
            className="flex flex-col gap-6 w-full overflow-x-hidden overflow-y-scroll  scrollbar-none h-[86vh] rounded-xl">
            <div className="flex flex-col gap-6">
                <SubHeader icon="bi bi-person-fill" name="Profile"/>
                <Suspense fallback={<ProfileCardLoading/>}>
                    <ProfileCard
                        id={profileInfo.id}
                        account={profileInfo?.accounttype}
                        countFollow={followersCount}
                        name={profileInfo?.fullName}
                        date={profileInfo?.date}
                        email={profileInfo?.email}
                        image={SERVERLINK + "/" + profileInfo?.profile}
                        phone={profileInfo?.phone}
                        forCurrentUser={profileInfo.id === personalInformation.id}
                    />
                </Suspense>
            </div>
            <div className="flex flex-col gap-6">
                <SubHeader
                    icon="bi bi-broadcast"
                    name={`Suivi(s)`}
                    rightContent={
                        <p className="text-black-100 dark:text-white-100">
                            {friendFollowerCount}
                        </p>
                    }
                />
                <div className="bg-white-100 dark:bg-white-0 flex flex-col gap-4 rounded-xl p-2">
                    {profileFriends.length > 0 ? (
                        profileFriends
                            .slice(0, 4)
                            .map((friend) => (
                                <RecentlyFriends
                                    className="w-full"
                                    key={friend.userid}
                                    spec={friend.userid}
                                    name={
                                        friend.firstname +
                                        (!friend.lastname ? "" : " " + friend.lastname)
                                    }
                                    image={SERVERLINK + "/" + friend.profileimage}
                                    message
                                    showRemoveFriendButton={
                                        friends.length > 0
                                            ? friends.find((fr) => fr.userid === friend.userid)
                                            : false
                                    }
                                    showAddFriendButton={
                                        friends.length > 0
                                            ? !friends.find((fr) => fr.userid === friend.userid)
                                            : false
                                    }
                                />
                            ))
                    ) : (
                        <Button onClick={() => handleSeeUsers(USERS_FILTERS.suggestion)}>Suivre un utilisateur</Button>
                    )}
                    {
                        profileFriends.length > 4 && (
                            <Button
                                className="w-full"
                                variant="secondary"
                                onClick={() => handleSeeUsers(USERS_FILTERS.follower)}
                            >
                                Voir tous vous suivis
                            </Button>
                        )
                    }
                </div>
            </div>
            {/*For mobile screen*/}
            {/*For other user*/}
            {profileInfo.id !== personalInformation.id && (
                <div className="md:hidden visible">
                    <Offers userId={id}/>
                </div>
            )}
            {/* For the current user */}
            {profileInfo.id === personalInformation.id && (
                <>
                    <div className="flex flex-col gap-6">
                        <SubHeader
                            name="Offres Sauvegardées"
                            icon="bi bi-bookmarks-fill"
                            rightContent={
                                <p className="text-black-80 dark:text-white-100">
                                    {savedOffers?.length}
                                </p>
                            }
                        />
                        <div className="flex flex-col gap-4 rounded-lg">
                            {savedOffers.length > 0 ? (
                                savedOffers
                                    .slice(0, 4)
                                    .map((savedOffer) => (
                                        <OfferCard key={savedOffer.saveid} sug={savedOffer} saved/>
                                    ))
                            ) : (
                                <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
                                    Pas de sauvegarde pour l'instant
                                </p>
                            )}
                            {savedOffers.length > 4 && (
                                <Button
                                    className="w-full"
                                    onClick={() => navigate(`/profile/${id}/savedOffers`)}
                                >
                                    Voir tous les sauvegardes
                                </Button>
                            )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        
                        <SubHeader
                            name="Vos Offres"
                            icon="bi bi-briefcase-fill"
                            rightContent={
                                <div className="flex gap-2 items-center justify-center ">
                                    <Icon icon="bi bi-plus-lg" size="sm"
                                          onClick={() => navigate(`/profile/${id}/newOffer`)}/>
                                    <Filter
                                        onFilter={() => setFilteredCurrentUserOffer(filterCurrentUserOffers(currentUserOffers))}
                                        filterBoxMainTitle="Filtrer les offres par"
                                        filters={CURRENT_USER_OFFER_FILTERS}
                                        filterBoxClassName="fixed top-[64px] right-0"/>
                                </div>
                            }
                        />
                        <div className="flex flex-col gap-4 rounded-lg">
                            {
                                filteredCurrentUserOffer?.length > 0 ? (
                                    <Suspense fallback={<OfferCardLoading/>}>
                                        {filteredCurrentUserOffer?.map((filteredCurrentUserOffer) => (
                                            <OfferCard
                                                forCurrentUser
                                                key={filteredCurrentUserOffer.offerid}
                                                sug={filteredCurrentUserOffer}
                                            />
                                        ))}
                                    </Suspense>

                                ) : < div className="nothing-box"> Pas d'offres</div>
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
