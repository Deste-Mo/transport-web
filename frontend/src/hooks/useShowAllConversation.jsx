import { useEffect, useState } from "react";
import { SERVERLINK } from "../constants";


const useShowAllConversation = (token) => {

    const [conversations, setConversations] = useState([]); 

    useEffect(() => {
        fetch(SERVERLINK + '/api/messages/conversation', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }).then((response) => response.json()).then((responseData) => setConversations(responseData))

    }, [token, setConversations])

    return [conversations];
}

export default useShowAllConversation;