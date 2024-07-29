
import {useAuth} from "../context/AuthProvider.jsx";
import {SubHeader} from "../components/pages/SubHeader.jsx";
import {Notification} from "../components/pages/Notification.jsx";
import {Button} from "../styles/components.js";
import {appVariants} from "../animations/variants.js";
import {motion} from "framer-motion";

const Notifications = () => {
    const {personalInformation} = useAuth();
    const user = personalInformation;

    return (
        <motion.section className="flex flex-col items-center justify-center w-full gap-6" variants={appVariants} initial="hidden" whileInView="visible" viewport={{once : true}}>
            <SubHeader  name="Notifications" icon="bi bi-bell-fill"  sticky rightContent={<Button size="sm" icon="bi bi-check" variant="secondary" rounded="full">Tout marquer comme lu</Button>}/>
            <div className="flex flex-col  w-full gap-4">
                <Notification propos="Decouvrir les nouvelle fonctionallites" time={15 + " minutes"} icon/>
                <Notification propos="Decouvrir les nouvelle fonctionallites" time={10 + " minutes"} icon viewed/>
            </div>
        </motion.section>
    );
};

export default Notifications;
