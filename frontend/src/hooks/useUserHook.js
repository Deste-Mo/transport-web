import axios from "axios";
import {SERVERLINK} from "../constants/index.js";
import {useEffect, useState} from "react";

const useUserHook = ({token, userId = null}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchUser = async () => {
        setLoading(true);
        axios.get(`${SERVERLINK}/api/auth/me/${userId ?? ''}`, {
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

    };
    

    useEffect(() => {
        fetchUser()
    }, [])
    
    return {
        user,
        loading,
        error,
    }
}

export default useUserHook