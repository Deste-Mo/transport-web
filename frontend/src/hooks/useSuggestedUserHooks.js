import axios from "axios";
import {SERVERLINK} from "../constants/index.js";
import {useState} from "react";

const useSuggestedUserHook = () => {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchSuggestedUsers = async (token) => {
        setLoading(true);
        await axios.get(`${SERVERLINK}/api/messages/users`, {
            headers: {token},
        })
            .then((response) => {
                setSuggestedUsers(response?.data?.allUsers);
            })
            .catch((error) => {
                setError(error?.message);
                console.error('Error while fetching suggested users : ', error?.message);
            })
            .finally(() => {
                setLoading(false);
                
            })
    };

    return {
        error,
        loading,
        suggestedUsers,
        fetchSuggestedUsers
    }
}

export default useSuggestedUserHook