import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from "../../ui/Button";
import {useUser} from "../../../context/UserProvider.jsx";
import {useAuth} from "../../../context/AuthProvider.jsx";
import {useAnimation} from "../../../context/AnimationProvider.jsx";
import {useSocketContext} from "../../../context/SocketContext.jsx";
import Icon from "../../ui/Icon.jsx";

const ProfileCard = ({
                         id,
                         name,
                         account,
                         profile = false,
                         email,
                         image,
                         phone,
                         date,
                         onClick,
                         forCurrentUser = false
                     }) => {
    const navigate = useNavigate();

    const {followUser, unFollowUsers, friends, handleSendEmailConf} = useUser();
    const {personalInformation, profileInfo, token} = useAuth();
    const [loading, setLoading] = useState(true);
    const [isFriend, setIsFriend] = useState(false);

    const {socket} = useSocketContext();

    const {setMessagePopup} = useAnimation();

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
        setIsFriend(friends.length > 0 ? friends.find(friend => friend.userid === id) : false);
    }, [friends, id])

    return (
        <div
            className="flex flex-col gap-6 rounded-xl shadow-sm border text-black-100 dark:text-white-100 border-black-0 p-4 bg-white-100 dark:bg-black-100 dark:border-none w-full">
            <div className="flex justify-center items-start">
                <i className="disabled:bi-0-circle"></i>

                <div className="flex flex-col items-center justify-center gap-4">
                    <img
                        src={image}
                        alt=""
                        className="size-[84px] bg-black-20 rounded-full"
                    />
                    <div className="flex flex-col gap-1 items-center justify-center text-subtitle-2">
                        <span>{name}</span>
                        <span className="text-black-60 dark:text-white-100 dark:font-sm text-small-1 font-light">
                            {account}
                        </span>
                    </div>
                </div>
                {/*<Icon size="sm" variant="ghost" icon="bi bi-three-dots-vertical"/>*/}
            </div>
            <div
                className={`flex w-full text-base text-black-100 
         items-center justify-between max-[1200px]:flex-col gap-y-4
      `}
            >
                <div className="flex items-center gap-2 dark:text-white-100 dark:font-sm">
                    <i className="bi bi-envelope-at"></i>
                    <span>{email}</span>
                </div>

                <div className="flex items-center  gap-2 dark:text-white-100 dark:font-sm">
                    <i className="bi bi-phone-flip"></i>
                    <span>{phone}</span>
                </div>

                <div className="flex items-center  gap-2 dark:text-white-100 dark:font-sm">
                    <i className="bi bi-calendar"></i>
                    <span>{date}</span>
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
                                onClick={() => navigate(`/profile/${id}/newOffer`)}
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
                        <Button
                            block
                            variant="danger"
                            size="md"
                            icon="bi bi-dash"
                            onClick={() => unFollowUsers(profileInfo.id, id)}
                        >
                            Retirer
                        </Button>
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
