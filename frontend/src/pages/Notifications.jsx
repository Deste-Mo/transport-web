
import {useAuth} from "../context/AuthProvider.jsx";
import {SubHeader} from "../components/pages/SubHeader.jsx";
import {Notification} from "../components/pages/Notification.jsx";

const Notifications = () => {
    const {personalInformation} = useAuth();
    const user = personalInformation;

    return (
        <section className="flex flex-col items-center justify-center w-full gap-6">
            <SubHeader  name="Notifications" icon="bi bi-bell" disableButton sticky/>
            <div className="flex flex-col  w-full gap-4">
                <Notification propos="Decouvrir les nouvelle fonctionallites" time={15 + " minutes"} icon/>
                <Notification propos="Decouvrir les nouvelle fonctionallites" time={10 + " minutes"} icon viewed/>
            </div>
        </section>
    );
};

export default Notifications;
