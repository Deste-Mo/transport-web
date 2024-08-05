import {useAuth} from "../context/AuthProvider.jsx";
import {SubHeader} from "../components/pages/SubHeader.jsx";
import {Icon} from "../styles/components.js";
import {motion} from "framer-motion";
import {appVariants} from "../animations/variants.js";
import ExpandableSearchBar from "../components/ui/ExpandableSearchBar.jsx";
import { Suspense, lazy } from "react";
import OfferCardLoading from "../components/loader/OfferCardLoading.jsx";
const OfferCard = lazy(() => import("../components/pages/Offer/OfferCard.jsx"))

const Home = () => {
    const {personalInformation, logout, setRegistrationStep} = useAuth();
    const user = personalInformation;

    return (
        <motion.section className="flex flex-col items-center justify-center w-full gap-6" variants={appVariants} initial="hidden" whileInView="visible" viewport={{once : true}}>
            <SubHeader name="Actualites" icon="bi bi-grid-fill" rightContent={<ExpandableSearchBar/>}/>
            <div className="flex flex-col items-center justify-center gap-[64px] w-full ">
                {
                    [1,2,3,4,5,6].map((item) => (
                        <Suspense key={item} fallback={<OfferCardLoading/>}>
                            <OfferCard/>
                        </Suspense>
                    ))
                }
            </div>
        </motion.section>
    );
};

export default Home;
