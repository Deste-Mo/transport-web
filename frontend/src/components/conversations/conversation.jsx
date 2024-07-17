import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider";
import { useApp } from "../../context/AppPorvider";
import { SERVERLINK } from "../../constants";
import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";

const Conv = ({ id, userToChat }) => {

    const navigate = useNavigate();

    const { token } = useAuth();

    const image = SERVERLINK + "/" + userToChat.profileimage;

    const [isViewed, setViewed] = useState(false);

    const handleClick = () => {
        localStorage.setItem('userToChat', JSON.stringify({ id: userToChat.userid, fullName: userToChat.firstname + " " + userToChat.lastname, accounttype: userToChat.accounttype, pic: image }))

        navigate('/message')
    }

    const { onlineUsers } = useSocketContext();

    const isOnline = onlineUsers.includes(userToChat.userid);

    useEffect(() => {

        // console.log(onlineUsers);
        const verifyStatus = async () => {

            const response = await fetch(SERVERLINK + "/api/messages/seen/" + userToChat.userid, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            })

            const verification = await response.json();

            setViewed(await verification.allSeen);
        }
        verifyStatus();
    }, [])

    return (
        <div className={`${!isViewed ? 'bg-primary-40' : 'bg-white-80'} flex justify-between items-center p-3 rounded-lg mb-3 cursor-pointer`} onClick={e => handleClick(e)} >
            <div className="flex justify-center items-center" >
                <div className="mr-5 relative">
                    
                    <img src={ !image ? '../../assets/images/OIP.jpg' : image } alt="" className="rounded-full w-[40px] h-[40px]" />
                    {isOnline ? <span className="h-[10px] w-[10px] rounded-[50%] bg-success-100 block absolute right-0 top-0" ></span> : null}
                </div>
                <div>
                    <span className="block text-small-2 text-black-60">{userToChat.firstname + " " + userToChat.lastname}</span>
                    <span className="block text-small-3 bg-primary-80 w-fit rounded-xl text-center text-black-60 px-3 mb-2">{userToChat.accounttype}</span>
                </div>
            </div>
            <div>
                <span className="text-small-3"><i className="bi bi-circle mr-3"></i>Il y a 10 minutes</span>
            </div>
        </div>
    )
}

export default Conv;