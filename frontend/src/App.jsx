// Main import
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";


// Components
import Home from './pages/Home';
import Labo from './pages/labo/Labo';
import AppLayout from "./layouts/AppLayout.jsx";
import AuthLayout, {
    Login,
    RegisterAccountType,
    RegisterIdentification,
    RegisterSecurity
} from "./layouts/AuthLayout.jsx";
import NotFound from "./pages/auth/NotFound.jsx";
import Forbidden from "./pages/auth/Forbidden.jsx";
import Unauthorized from "./pages/auth/Unauthorized.jsx";
import Offer from "./pages/offer/Offer.jsx";
import Profile from "./pages/profile/Profile.jsx";
import ProfilePresentation from "./pages/profile/ProfilPresentation.jsx";
import ProfileEdit from "./pages/profile/ProfileEdit.jsx";
import Notifications from "./pages/Notifications.jsx";
import Friends from "./pages/Friend.jsx";
import Offers from "./pages/Offers.jsx";
import NavPageLayout from "./layouts/NavPageLayout.jsx";

import Security from './pages/profile/Security';
import VehicleAdd from './pages/profile/VehicleAdd';
import CardOffer from './pages/offer/CardOffer';
import LittleCardOffer from './pages/offer/LittleCardOffer';
import Messages from "./pages/conversations/Message.jsx";
import MessageList from "./pages/conversations/MessageList.jsx";


export default function App() {

    return (
        <div className="App">
            <Routes>
                {/* Auth */}
                <Route element={<AuthLayout/>}>
                    <Route path="/login" element={<Login/>}></Route>

                    <Route path="/registerAccountType" element={<RegisterAccountType/>}></Route>
                    <Route path="/registerIdentification" element={<RegisterIdentification/>}></Route>
                    <Route path="/registerSecurity" element={<RegisterSecurity/>}></Route>
                </Route>

                {/* App */}
                <Route element={<AppLayout/>}>
                    
                    {/*Profile*/}
                    <Route path="profile/" element={<Profile/>}/>
                    <Route path="profile/presentation" element={<ProfilePresentation/>}/>
                    <Route path="profile/edit/:id" element={<ProfileEdit/>}/>
                    
                    <Route path="/securite" element = {<Security/>} />
                    <Route path="/vehicleadd" element = {<VehicleAdd/>} />
                    <Route path = "/cardoffer" element = {<CardOffer/>}/>
                    <Route path = "/littlecardoffer" element = {<LittleCardOffer/>}/>


                    
                    <Route element={<NavPageLayout/>}>
                        {/*Home*/}
                        <Route path="/" element={<Home/>}></Route>
                        
                        {/* Offer*/}
                        <Route path="/offer" element={<Offers/>}/>

                        {/* Friend*/}
                        <Route path="/friend" element={<Friends/>}/>

                        {/* Notifications*/}
                        <Route path="/notification" element={<Notifications/>}/>

                        {/* Bug */}
                        <Route path="/bug" element={<Offer/>}/>
                        
                        {/*Messages*/}
                        <Route path="/discussion" element={<MessageList />}/>
                        <Route path="/message" element={<Messages />}/>
                    </Route>
                    
                </Route>

                {/* Pages Error */}
                <Route path="*" element={<NotFound/>}/>
                <Route path="/forbidden" element={<Forbidden/>}/>
                <Route path="/unauthorized" element={<Unauthorized/>}/>

                {/* Labo (Only for testing components)*/}
                <Route path="/labo" element={<Labo/>}></Route>
            </Routes>
        </div>
    );
}