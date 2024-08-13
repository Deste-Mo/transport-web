import { useAuth } from "../context/AuthProvider.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../components/pages/Header.jsx";
import { SERVERLINK } from "../constants/index.js";
import { useApp } from "../context/AppProvider.jsx";
import { useUser } from "../context/UserProvider.jsx";
import { useNotification } from "../context/NotficationProvider.jsx";
import { useOffer } from "../context/OfferProvider.jsx";

const AppLayout = () => {
    const {token, loading, personalInformation} = useAuth();

    const user = personalInformation;
    const {getUnreadMessageCount, countUnread} = useApp();

    const { getFriends, getUsers } = useUser();

    const { getNotifications } = useNotification();

    const { getCurrentUserOffers } = useOffer();

    const { socket } = countUnread;

    useEffect(() => {

        // handleFriends()

        socket?.on("newNotif", () => {
            getNotifications();
            getFriends();
            getCurrentUserOffers();
        });2

        socket?.on("newMessage", () => {
            getUnreadMessageCount();
            getUsers();
        });
        return () => { socket?.off("newMessage"); socket?.off("newNotif") }
    }, [socket, countUnread, getUnreadMessageCount]);

    return (

        loading ? <p className="text-primary-100 text-title-3">Loading ...</p> : token ?
            <section className="relative scrollbar-none">
                <Header profileImage={SERVERLINK + "/" + user.profile || "X.png"}/>
                <div className="mt-[7em] max-md:mb-[7em] max-md:mt-[5em] scrollbar-none ">
                    <Outlet/>
                </div>
            </section> : <Navigate to="/login"/>
    )
}


export default AppLayout;