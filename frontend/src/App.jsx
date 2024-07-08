// Main import
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Constants
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

        <Route path="/" element={<Home/>}></Route>

        {/* Labo routes */}
        <Route path="/labo" element={<Labo />}></Route>
      </Routes>
    </div>
  );
}
