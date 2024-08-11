import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";
import "./styles/index.css";
import {BrowserRouter as Router} from "react-router-dom";
import FormProvider from "./context/FormProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import AppProvider from "./context/AppProvider.jsx";
import SocketContextProvider from "./context/SocketContext.jsx";
import AnimationProvider from "./context/AnimationProvider.jsx";
import UserPreferenceProvider from "./context/UserPreferenceProvider.jsx";
import HomeProvider from "./context/HomeProvider.jsx";
import DiscussionProvider from "./context/DiscussionProvider.jsx";
import OfferProvider from "./context/OfferProvider.jsx";
import NotficationProvider from "./context/NotficationProvider.jsx";
import ProfileProvider from "./context/ProfileProvider.jsx";
import UserProvider from "./context/UserProvider.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <AnimationProvider>
                <AuthProvider>
                    <UserPreferenceProvider>
                        <AppProvider>
                            <SocketContextProvider>
                                <HomeProvider>
                                    <DiscussionProvider>
                                        <OfferProvider>
                                            <UserProvider>
                                                <NotficationProvider>
                                                    <ProfileProvider>
                                                        <FormProvider>
                                                            <App/>
                                                        </FormProvider>
                                                    </ProfileProvider>
                                                </NotficationProvider>
                                            </UserProvider>
                                                
                                        </OfferProvider>
                                    </DiscussionProvider>
                                </HomeProvider>
                            </SocketContextProvider>
                        </AppProvider>
                    </UserPreferenceProvider>
                </AuthProvider>
            </AnimationProvider>
        </Router>
    </React.StrictMode>
);
