import {useAuth} from "../context/AuthProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";
import {useEffect} from "react";
import {Header} from "../components/pages/Header.jsx";
import {SERVERLINK} from "../constants/index.js";
import {useApp} from "../context/AppPorvider.jsx";


import {usePreference} from "../context/UserPreferenceProvider.jsx";

const AppLayout = () => {
    const {token, loading, personalInformation} = useAuth();

    const user = personalInformation;
    const {getUnreadMessageCount, countUnread} = useApp();

    const {socket} = countUnread;

    useEffect(() => {
        socket?.on("newMessage", () => {
            getUnreadMessageCount();
        });
        return () => socket?.off("newMessage")
    }, [socket, countUnread, getUnreadMessageCount]);

    return (

        loading ? <p className="text-black-100 text-title-3">Loading ...</p> : token ?
            <section className="relative">
                <Header profileImage={SERVERLINK + "/" + user.profile || "X.png"}/>
                <div className="mt-[7em]">
                    <Outlet/>
                </div>
            </section> : <Navigate to="/login"/>
    )
}


export default AppLayout;