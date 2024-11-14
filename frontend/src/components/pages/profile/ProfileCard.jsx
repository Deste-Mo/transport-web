import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from "../../ui/Button";
import {useUser} from "../../../context/UserProvider.jsx";
import {useAuth} from "../../../context/AuthProvider.jsx";
import {useAnimation} from "../../../context/AnimationProvider.jsx";
import {useSocketContext} from "../../../context/SocketContext.jsx";
import Icon from "../../ui/Icon.jsx";
import {useOffer} from "../../../context/OfferProvider.jsx";
import useFollowersHook from "../../../hooks/useFollowersHook.js";

const ProfileCard = ({
                         id,
                         name,
                         account,
                         email,
                         image,
                         phone,
                         date,
                         onClick,
                         forCurrentUser = false
                     }) => {
    const navigate = useNavigate();
    const {id : userId} = useParams();

    const {followUser, unFollowUsers, friends} = useUser();
    const {personalInformation, profileInfo, token} = useAuth();
    const [loading, setLoading] = useState(true);
    const [isFriend, setIsFriend] = useState(false);
    const {followersCount, getFriends} = useUser();
    const {
        getCurrentUserOffers,
        currentUserOffers
    } = useOffer();
    const {removeOfferInStorage} = useOffer();
    
    // WILL BE FULLY USER IN THE UPCOMING REFACTOR
    const {fetchFollowers, followers, loading : fetchingFollowers} = useFollowersHook();

    const contactUser = () => {
        localStorage.setItem(
            "userToChat",
            JSON.stringify({
                id: profileInfo?.userid,
                fullName: profileInfo?.firstname + " " + profileInfo?.lastname,
                accounttype: profileInfo?.accounttype,
                pic: image,
            })
        );
        navigate("/message");
    };
    

    useEffect(() => {
        getCurrentUserOffers(userId);
        getFriends();

        
    }, []);

    useEffect(() => {
        fetchFollowers(userId,token);
        setTimeout(() => setLoading(false), 1000);
        setIsFriend(friends.length > 0 ? friends.find(friend => friend.userid === id) : false);
    }, [friends, id])

    return (
        <div
            className="flex flex-col gap-10 rounded-xl shadow-sm border text-black-100 dark:text-white-100 border-black-0 p-4 bg-secondary-l dark:bg-secondary-d dark:border-none w-full">
            <div className="flex flex-row items-center justify-evenly max-[1320px]:flex-col gap-y-6">
                <div className="flex justify-center items-start">
                    <i className="disabled:bi-0-circle"></i>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <img
                            src={image}
                            alt=""
                            className="max-md:size-[84px] size-[128px] bg-black-20 rounded-full object-cover"
                        />
                        <div className="flex flex-col gap-1 items-center justify-center text-subtitle-2">
                            <span>{name}</span>
                            <span className=" text-base text-text-sec-l dark:text-text-sec-d">
                                       {account}
                                   </span>
                        </div>
                    </div>
                    {/*<i className="bi bi-three-dots-vertical"></i>*/}
                </div>
                <div
                    className={`flex justify-center  gap-10 text-base text-black-80  dark:text-white-80
                     
                   `}
                >
                    <div className="flex flex-col items-center justify-between  gap-2">
                        <span className={'text-subtitle-2 text-text-l dark:text-text-d'}>{currentUserOffers.length > 0 ? currentUserOffers.length : 0}</span>
                        <span className={'text-text-sec-l dark:text-text-sec-l'}>Offre(s)</span>
                    </div>
                    <div className="flex flex-col items-center justify-between  gap-2">
                        <span className={'text-subtitle-2 text-text-l dark:text-text-d'}>{fetchingFollowers ? '...' : (followers?.length > 0 ? followers?.length : 0)}</span>
                        <span className={'text-text-sec-l dark:text-text-sec-l'}>Suivi(s)</span>
                    </div>
                </div>
            </div>
            <div
                className={`flex w-full text-base 
         items-center justify-between max-[1200px]:flex-col gap-y-4
      `}
            >
                <div className="flex flex-col items-center justify-between  gap-2">
                    <div className="flex items-center gap-2 dark:text-white-100 dark:font-sm">
                        <i className="bi bi-envelope-at"></i>
                        <span>{email}</span>
                    </div>
                    <p className={'text-small-1 text-text-sec-l dark:text-text-sec-l'}>Email</p>
                </div>
                <div className="flex flex-col items-center justify-between  gap-2">
                    <div className="flex items-center gap-2 dark:text-white-100 dark:font-sm">
                        <i className="bi bi-phone"></i>
                        <span>{phone}</span>
                    </div>
                    <p className={'text-small-1 text-text-sec-l dark:text-text-sec-l'}>Téléphone</p>
                </div>
                <div className="flex flex-col items-center justify-between  gap-2">
                    <div className="flex items-center gap-2 dark:text-white-100 dark:font-sm">
                        <i className="bi bi-calendar"></i>
                        <span>{date}</span>
                    </div>
                    <p className={'text-small-1 text-text-sec-l dark:text-text-sec-l'}>Date de création du compte</p>
                </div>
            </div>

            {forCurrentUser ? (
                    <div className="flex gap-2 max-[1320px]:flex-col">
                        <Button
                            block
                            size="md"
                            icon="bi bi-pencil"
                            onClick={() => navigate(`/profile/${id}/edit`)}
                        >
                            Modifier les informations
                        </Button>
                        <div className="flex gap-2">
                            <Button
                                block
                                size="md"
                                icon="bi bi-plus-lg"
                                onClick={() => {
                                    removeOfferInStorage(id);
                                    navigate(`/profile/${id}/newOffer`)
                                }}
                            >
                                Publier
                            </Button>
                            <Button
                                block
                                size="md"
                                icon="bi bi-wallet"
                                onClick={() => navigate(`/abonnement`)}
                            >
                                S'abonner
                            </Button>

                        </div>
                    </div>
                ) :
                isFriend ? (
                        <div className={'flex w-full justify-center gap-4'}>
                            <Button
                                block
                                variant="primary"
                                size="md"
                                icon={'bi bi-chat'}
                                onClick={contactUser}
                            >
                                Contacter
                            </Button>
                            <Button
                                block
                                variant="secondary-2"
                                icon={'bi bi-dash'}
                                size="md"
                                onClick={() => unFollowUsers(profileInfo.id, id)}
                            >
                                Retirer
                            </Button>
                        </div>
                    )
                    : (
                        <Button
                            block
                            size="md"
                            icon="bi bi-plus-lg"
                            onClick={() => followUser(profileInfo.id, id, personalInformation)}
                        >
                            Suivre
                        </Button>)
            }
        </div>
    );
};
export default ProfileCard;
