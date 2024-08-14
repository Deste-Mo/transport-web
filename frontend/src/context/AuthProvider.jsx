import {createContext, useContext, useEffect, useLayoutEffect, useState} from "react";
import {ACCOUNT_TYPES, REGISRATION_STEPS, SERVERLINK, TOAST_TYPE} from "../constants/index.js";
import {useLocation, useNavigate} from "react-router-dom";
import api from "../utils/api.js";
import axios from "axios";
import {useAnimation} from "./AnimationProvider.jsx";
axios.defaults.withCredentials = true;
export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
    const [personalInformation, setPersonalInformation] = useState([]);
    const [profileInfo, setProfileInfo] = useState([]);
    const [registerMode, setRegisterMode] = useState(ACCOUNT_TYPES.camion);
    const [registrationStep, setRegistrationStep] = useState(
        REGISRATION_STEPS.accoutType
    ); // In witch registration route is the user
    const [loading, setLoading] = useState(true);
    const [loadingInformation, setLoadingInformation] = useState(false);
    const [token, setToken] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    
    const navigate = useNavigate();

    // Register handler
    const [inputs, setInputs] = useState({
        firstname: "",
        lastname: "",
        userCin: "",
        companyNumber: "",
        phone: "",
        adress: "",
        email: "",
        bio: "",
        profileImage: "",
        accountId: 0,
        password: "",
        confirmPassword: "",
    });
    const [errorData, setErrorData] = useState({
        firstname: true,
        lastname: true,
        userCin: true,
        companyNumber: true,
        phone: true,
        adress: true,
        email: true,
        bio: true,
        profileImage: true,
        accountId: true,
        password: true,
        confirmPassword: true
    })

    const updateAuthorization = (accessToken) => {
        setToken(accessToken);
        setIsAuth(token !== null);
    }

    const getInformation = async (accessToken, userId) => {
        api.get(`${SERVERLINK}/api/auth/me/${!userId ? '' : userId}`, {
            headers: {
                token: accessToken,
            }
        })
            .then(res => {
                setPersonalInformation(res.data.personalInfo);
                setProfileInfo(res.data.profileInfo)
            })
            .catch(e => {
                console.log(`Erreur : ${e.response.data.error}`);
                // setToken(null);
            })

    };


    const logout = () => {
        axios.post(`${SERVERLINK}/api/auth/logout`)
            .then(res => {
                // console.log(res.data.success);
                setToken(null);
                navigate("/login");
            })
            .catch(e => {
                console.log(e.response.data.error);
            })
    }

    const login = async (accessToken) => {
        updateAuthorization(accessToken);
        await getInformation(accessToken);
        navigate("/");
    }


    useEffect(() => {
        setLoading(true);
        const refreshToken = async () => {
            axios.get(`${SERVERLINK}/api/auth/token`)
                .then(res => {
                    // console.log(`New access token : ${res.data.accessToken}`);
                    setToken(res.data.accessToken);
                    getInformation(res.data.accessToken);
                })
                .catch(e => {
                    console.log(`Erreur : ${e.response.data.error}`);
                    updateAuthorization(null);
                }).finally(() => {
                setLoading(false);
            })

        };
        refreshToken();
        
    }, [token]);
    
    return (
        <AuthContext.Provider
            value={{
                loadingInformation,
                personalInformation,
                setPersonalInformation,
                getInformation,
                inputs,
                setInputs,
                errorData,
                setErrorData,
                registerMode,
                setRegisterMode,
                registrationStep,
                setRegistrationStep,
                logout,
                login,
                loading,
                setLoading,
                token,
                setToken,
                isAuth,
                updateAuthorization,
                setProfileInfo,
                profileInfo
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
