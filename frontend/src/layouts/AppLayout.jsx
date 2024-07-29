import {useAuth} from "../context/AuthProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";
import {Header} from "../components/pages/Header.jsx";
import {SERVERLINK} from "../constants/index.js";
import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext.jsx";
import { useApp } from "../context/AppPorvider.jsx";

const AppLayout = () => {
    const {token, loading, personalInformation} = useAuth();
    const user = personalInformation;
    const { handleCountUnread, countUnread, handleNotificationShow, handleOffersForUser } = useApp();

    const { socket } = useSocketContext();

    useEffect(() => {
        socket?.on("newMessage", () => {
            handleCountUnread();
        });

        return () => socket?.off("newMessage")
    }, [socket, countUnread, handleCountUnread]);

    return loading ? <p className="text-black-100 text-title-3">Loading ...</p> : token ?
        <section className="relative">
            <Header profileImage={SERVERLINK + "/" + user.profile || "X.png"}/>
            <div className="mt-[7em]" >
                <Outlet/>
            </div>
        </section> : <Navigate to="/login"/>;
}


export default AppLayout;