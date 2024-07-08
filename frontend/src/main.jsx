import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";
import "./styles/index.css";
import {BrowserRouter as Router} from "react-router-dom";
import FormProvider from "./context/FormProvider.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <FormProvider>
                    <App/>
                </FormProvider>
            </AuthProvider>
        </Router>
    </React.StrictMode>
);
