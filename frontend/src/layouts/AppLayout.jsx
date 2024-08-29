import {useAuth} from "../context/AuthProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";
import {useEffect} from "react";
import {Header} from "../components/pages/Header.jsx";
import {SERVERLINK, TOAST_TYPE} from "../constants/index.js";
import {useApp} from "../context/AppProvider.jsx";
import {useUser} from "../context/UserProvider.jsx";
import {useNotification} from "../context/NotficationProvider.jsx";
import {useOffer} from "../context/OfferProvider.jsx";
import {useSocketContext} from "../context/SocketContext.jsx";
import {Loader} from "../styles/components.js";
import DefaultLoader from "../components/loader/DefaultLoader.jsx";
import {useAnimation} from "../context/AnimationProvider.jsx";
import useWindowSize from "../hooks/useWindowSize.jsx";

const AppLayout = () => {
    const {token, loading, personalInformation} = useAuth();
    const {setHideMobileNavigation, hideMobileNaviagation} = useAnimation();
    const user = personalInformation;
    const {getUnreadMessageCount, countUnread, setIsMobile} = useApp();

    const {getFriends, getUsers} = useUser();

    const {getNotifications, getUnreadNotifications, unreadNotificationsCount} = useNotification();

    const {getCurrentUserOffers, getSuggestedOffers} = useOffer();

    const {setMessagePopup} = useAnimation();

    const {socket} = useSocketContext();
    const [width] = useWindowSize();

    useEffect(() => {
        setHideMobileNavigation(false);
    }, []);

    useEffect(() => {

        // handleFriends()

        socket?.on("newNotif", () => {
            getNotifications();
            getUnreadNotifications();
            getFriends();
            getCurrentUserOffers();
            getSuggestedOffers();
            setMessagePopup("Nouvelle Notification", TOAST_TYPE.success);
        });

        socket?.on("newMessage", () => {
            getUnreadMessageCount();
            getUsers();
            setMessagePopup("Nouveau Message", TOAST_TYPE.success);
        });
        return () => socket?.off("newMessage");
    }, [socket, countUnread, getUnreadMessageCount, unreadNotificationsCount]);

    useEffect(() => {
        setIsMobile(width < 768);
    }, [width]);
    
    return loading ? (
        <DefaultLoader/>
    ) : token ? (
        <section className="relative scrollbar-none">
            <Header profileImage={SERVERLINK + "/" + user.profile || "X.png"}/>
            <div
                className={`mt-[7em] ${
                    hideMobileNaviagation
                        ? "max-md:mt-0 max-md:mb-0"
                        : "max-md:mb-[7em] max-md:mt-[5em]"
                } scrollbar-none `}
            >
                <Outlet/>
            </div>
        </section>
    ) : (
        <Navigate to="/login"/>
    );
};

export default AppLayout;
