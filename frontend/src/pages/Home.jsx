import {useAuth} from "../context/AuthProvider.jsx";
import {SubHeader} from "../components/pages/SubHeader.jsx";
import OfferCard from "../components/pages/Offer/OfferCard.jsx";


const Home = () => {
    const {personalInformation, logout, setRegistrationStep} = useAuth();
    const user = personalInformation;

    return (
        <section className="flex flex-col items-center justify-center w-full gap-6">
            <SubHeader name="Actualites" icon="bi bi-grid"/>
            <div className="flex flex-col items-center justify-center gap-10 w-full">
                {
                    [1,2,3,4,5,6].map((item) => (<OfferCard key={item}/>))
                }
            </div>
        </section>
    );
};

export default Home;
