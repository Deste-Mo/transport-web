import {useNavigate} from "react-router-dom";
import {useUser} from "../../../context/UserProvider.jsx";
import {useOffer} from "../../../context/OfferProvider.jsx";
import {useEffect} from "react";
import Button from "../../ui/Button.jsx";


const ProfileLeft = ({
                                id,
                                name,
                                account,
                                image,
                                onClick,
                            }) => {
    const navigate = useNavigate();

    const { followersCount, getFriends, friends } = useUser();
    const {
        getCurrentUserOffers,
        pubNumber
    } = useOffer();

    useEffect(() => {
        getCurrentUserOffers();
        getFriends();
    }, []);

    return (
            <div className="flex flex-col gap-6 rounded-xl shadow-sm border border-black-0 p-4 bg-white-100 dark:bg-black-0 dark:border-none w-full">

                <div className="flex flex-col items-center justify-center gap-4">
                    <img
                        src={image}
                        alt=""
                        className={`size-[84px]
            bg-black-20 rounded-full`}
                    />
                    <div className="flex flex-col gap-1 items-center justify-center ">
                        <p className="text-lead text-black-100 dark:text-white-100">{name}</p>
                        <span className="text-black-60 dark:text-white-60 text-small-1 font-light">
              {account}
            </span>
                    </div>
                </div>
                <div
                    className={`flex gap-4 text-base text-black-80  dark:text-white-80
          flex-col
        `}
                >
                    <div className="flex items-center justify-between  gap-2">
                        <span>Publication</span>
                    <span>{pubNumber}</span>
                    </div>
                    <div className="flex items-center  justify-between gap-2">
                        <span>Amis</span>
                        <span>{followersCount}</span>
                    </div>
                </div>

                <Button block variant="secondary" onClick={() => navigate(`/profile/${id}`)}>
                    Voir mon profile
                </Button>
            </div>

    );
};

export default ProfileLeft;