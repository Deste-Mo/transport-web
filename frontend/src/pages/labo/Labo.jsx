
import FriendCardLoading from "../../components/loader/FriendCardLoading.jsx";
import ProfileLeftLoading from "../../components/loader/ProfileLeftLoading.jsx";
import OfferCard from "../../components/pages/Offer/OfferCard.jsx";

const Labo = () => {
    return (
        <div className="p-6 dark:bg-black-100 h-screen">
            <OfferCard forCurrentUser />
        </div>
    )
}

export default Labo;