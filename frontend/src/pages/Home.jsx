import {useAuth} from "../context/AuthProvider.jsx";
import {ForAll} from "../components/pages/ForAll.jsx";
import CardOffer from "./offer/CardOffer.jsx";


const Home = () => {
    const {personalInformation, logout, setRegistrationStep} = useAuth();
    const user = personalInformation;

    return (
        <section className="flex flex-col items-center justify-center w-full gap-6">
            <ForAll name="Actualites" icon="bi bi-grid"/>
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                {
                    [1,2,3,4,5,6].map((item) => (<CardOffer key={item}/>))
                }
            </div>
        </section>
    );
};

export default Home;
