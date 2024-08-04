import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";
import "./styles/index.css";
import {BrowserRouter as Router} from "react-router-dom";
import FormProvider from "./context/FormProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import AppProvider from "./context/AppPorvider.jsx";
import SocketContextProvider from "./context/SocketContext.jsx";
import AnimationProvider from "./context/AnimationProvider.jsx";
import UserPreferenceProvider from "./context/UserPreferenceProvider.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <AnimationProvider>
                <UserPreferenceProvider>
                <AppProvider>
                        <SocketContextProvider>
                            <FormProvider>
                                <App/>
                            </FormProvider>
                        </SocketContextProvider>
                </AppProvider>
                </UserPreferenceProvider>
                </AnimationProvider>
            </AuthProvider>
        </Router>
    </React.StrictMode>
);
