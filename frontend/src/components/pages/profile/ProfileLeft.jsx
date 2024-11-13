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

    const {followersCount, getFriends, friends} = useUser();
    const {
        getCurrentUserOffers,
        pubNumber
    } = useOffer();

    useEffect(() => {
        getCurrentUserOffers();
        getFriends();
    }, []);

    return (
        <div
            className="flex flex-col gap-6 rounded-xl shadow-sm border border-black-0 p-4 bg-secondary-l dark:bg-secondary-d dark:border-none w-full">

            <div className={'flex flex-row items-center justify-evenly max-[1320px]:flex-col gap-y-6'}>
                <div className="flex flex-col items-center justify-center gap-4">
                    <img
                        src={image}
                        alt=""
                        className={`size-[84px]
            bg-black-20 object-cover rounded-full`}
                    />
                    <div className="flex flex-col gap-1 items-center justify-center ">
                        <p className="text-lead text-black-100 dark:text-white-100">{name}</p>
                        <span className="text-black-60 dark:text-white-60 text-small-1 font-light">
                            {account}
                        </span>
                    </div>
                </div>

                <div
                    className={`flex justify-center  gap-4 text-base text-black-80  dark:text-white-80
          
        `}
                >
                    <div className="flex flex-col items-center justify-between  gap-2">
                        <span className={'text-subtitle-2 text-text-l dark:text-text-d'}>{pubNumber}</span>
                        <span className={'text-text-sec-l dark:text-text-sec-l'}>Publications</span>
                    </div>
                    <div className="flex flex-col items-center justify-between  gap-2">
                        <span className={'text-subtitle-2 text-text-l dark:text-text-d'}>{followersCount}</span>
                        <span className={'text-text-sec-l dark:text-text-sec-l'}>Suivi(s)</span>
                    </div>
                </div>
            </div>

            <Button variant="secondary" block onClick={() => navigate(`/profile/${id}`)}>
                Voir mon profil
            </Button>
        </div>

    );
};

export default ProfileLeft;