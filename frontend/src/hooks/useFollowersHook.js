import {useState} from "react";
import axios from "axios";
import {SERVERLINK} from "../constants/index.js";

const useFollowersHook = () => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchFollowers = async (userId, token) => {
        setLoading(true);
        axios.get(
            `${SERVERLINK}/api/profile/friends/${userId}`,
            {
                headers: {token},
            }
        ).then((res) => {
            setFollowers(res?.data?.profile);
        })
            .catch((err) => {
                console.error('Error fetching followers', err?.message);
                setError(err?.message);
            })
            .finally(() => setLoading(false));
        
    };

    const removeFollower = async (followerId, userId, token) => {
        // TODO : 
        await fetch(SERVERLINK + "/api/profile/unfollow/" + followerId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });
        fetchFollowers(userId, token);
    }

    const followUser = async (targetId, userId, me, token) => {
        const content = me.fullName + " Vous suit desormais.";

        await fetch(SERVERLINK + "/api/profile/follow/" + targetId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        });

        const sendNotifs = await fetch(
            SERVERLINK + "/api/notifs/sendnotifs/" + targetId,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify({content}),
            }
        );

        fetchFollowers(userId, token);
    };

    
    return {
        removeFollower,
        followUser,
        fetchFollowers,
        followers,
        loading,
        error,
    }
}

export default useFollowersHook;