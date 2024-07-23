import {useAuth} from "../context/AuthProvider.jsx";
import {SubHeader} from "../components/pages/SubHeader.jsx";
import OfferCard from "../components/pages/Offer/OfferCard.jsx";

const Offers = () => {
    const {personalInformation, logout, setRegistrationStep} = useAuth();
    const user = personalInformation;

    return (
        <section className="flex flex-col items-center justify-center w-full gap-6">

            <SubHeader name="Offres" icon="bi bi-bag" sticky/>
            <div className="flex flex-col items-center justify-center gap-6 w-full">
                {
                    [1,2,3,4,5,6].map((item) => (<OfferCard />))
                }
            </div>
        </section>
    );
};

export default Offers;
