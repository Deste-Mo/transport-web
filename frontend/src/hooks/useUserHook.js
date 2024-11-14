import axios from "axios";
import {SERVERLINK} from "../constants/index.js";
import {useCallback, useEffect, useState} from "react";

const useUserHook = ({userId = null}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchUser = useCallback(async (token) => {
        setLoading(true);
        axios.get(`${SERVERLINK}/api/auth/me/${userId || ''}`, {
            headers: {
                token,
            }
        })
            .then(res => {
                const data = userId ? res.data.profileInfo : res.data.personalInfo;
                setUser(data);
            })
            .catch(e => {
                console.log(`Erreur : ${e.response.data.error}`);
                setError(e.response.data.error);
            }).finally(() => {
            setLoading(false);
        });

    }, []);
    

    return {
        fetchUser,
        user,
        loading,
        error,
    }
}

export default useUserHook