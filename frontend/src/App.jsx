import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { SERVERLINK } from "./constants";

import AuthLayout, {
  Login,
  Register,
  RegisterCli,
  RegisterEntr,
  RegisterPass,
} from "./pages/auth/AuthLayout";

import Home from "./pages/Home";
import Labo from "./pages/labo/Labo.jsx";
import Option_li from "./pages/Parametre/Option_li.jsx";
import Notif from "./pages/notif/Notif.jsx";
import FriendOption from "./pages/Parametre/Social/friend/FriendOption.jsx";
import Invitation from "./pages/Parametre/Social/friend/Invitation.jsx";
import Suggestion from "./pages/Parametre/Social/friend/Suggestion.jsx";
import All_friend from "./pages/Parametre/Social/friend/All_friend.jsx";

export default function App() {
  return (
    <div className="App">
      <Routes>
        
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/registerEntr" element={<RegisterEntr/>}></Route>
          <Route path="/registerCam" element={<RegisterCli/>}></Route>
          <Route path="/registerCli" element={<RegisterCli/>}></Route>
          <Route path="/registerPass" element={<RegisterPass/>}></Route>
        </Route>

        {/* Notification */}
        <Route path='/notification' element={<Notif /> }></Route>
        <Route path='/options' element={<Option_li /> }></Route>

        {/* Option amis */}
        <Route path="/friends" element={<FriendOption/>}></Route>
        <Route path="/invitation" element={<Invitation/>}></Route>
        <Route path="/suggestion" element={<Suggestion/>}></Route>
        <Route path="/all-friends" element={<All_friend/>}></Route>
        

        <Route path="/" element={<Home/>}></Route>

        {/* Labo routes */}
        <Route path="/labo" element={<Labo />}></Route>
      </Routes>
    </div>
  );
}
