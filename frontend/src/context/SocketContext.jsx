import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
import { SERVERLINK } from "../constants";

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    return context;
};

export const SocketContext = createContext();

// const socketURL = import.meta.env.MODE === "developement" ? SERVERLINK : "/";


const SocketContextProvider = ({ children }) => {

    const [ActiveUsers, setActiveUsers] = useState([]);

    const [socket, setSocket] = useState(null);

    const { personalInformation, loading } = useAuth();

    useEffect(() => {
        if (personalInformation && !loading) {

            const socket = io(SERVERLINK, {
                query: {
                    userId: personalInformation.id
                }
            });
            
            setSocket(socket);

            // socketRef.current = socket;

            socket.on("getOnlineUsers", (users) => {
                setActiveUsers(users);
            });

            return () => socket.close();
        } else{
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [personalInformation, loading]);

    return (
        <SocketContext.Provider value={
            {
                socket,
                ActiveUsers
            }
        }>
            {children}
        </SocketContext.Provider>
    )
};

export default SocketContextProvider;