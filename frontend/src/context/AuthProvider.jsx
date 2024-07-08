import { createContext, useContext, useEffect, useState } from "react";
import {SERVERLINK} from "../constants/index.js";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [accountId, setAccountId] = useState(1);
    const [isAuth, setIsAuth] = useState(false);
    const [infosPersonnel, setInfosPersonnel] = useState([]);

    // Register handler
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        usercin: "",
        companynumber: "",
        phone: "",
        adress: "",
        email: "",
        bio: "",
        profileimage: "",
        accountid: 0,
        password: "",
        confirmPassword: "",
    });

    const setAuth = (boolean) => {
        setIsAuth(boolean);
    };

    const getInformation = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(SERVERLINK + "/api/auth/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const parseRes = await response.json();
            setInfosPersonnel(parseRes);
        } catch (error) {
            console.error("Error fetching information:", error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setAuth(true);
            getInformation();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accountId,
                setAccountId,
                isAuth,
                setAuth,
                infosPersonnel,
                setInfosPersonnel,
                getInformation,
                inputs,
                setInputs,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
