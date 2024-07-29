/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"
import { SubHeader } from "./SubHeader"
import { useAuth } from "../../context/AuthProvider"
import { SERVERLINK } from "../../constants"
import { useApp } from "../../context/AppPorvider"
import { useSocketContext } from "../../context/SocketContext"
//import PropTypes from "prop-types";

const RecentlyFriends = ({ spec, image, name, account, showMessageButton = false, showRemoveFriendButton = false, showAddFriendButton = false, showProfileButton = true, className }) => {

    const { token, personalInformation } = useAuth();

    const { handleFriends, handleUsersToShow, handleNotificationShow } = useApp();

    const { ActiveUsers } = useSocketContext();


    const navigate = useNavigate();

    const id = spec;

    const isOnline = ActiveUsers.includes(id);

    // console.log("Online : " + isOnline);

    const handleFollow = async () => {

        const content = personalInformation.fullName + " Vous suit desormais.";

        const response = await fetch(SERVERLINK + '/api/profile/follow/' + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        const sendNotifs = await fetch(SERVERLINK + '/api/notifs/sendnotifs/' + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify({ content })
        });

        handleFriends()
        handleUsersToShow()
        handleNotificationShow();
    }

    const handleUnfollow = async () => {

        const response = await fetch(SERVERLINK + '/api/profile/unfollow/' + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        const answer = await response.json();

        handleFriends()
        handleUsersToShow()

    }

    const handleClick = () => {
        localStorage.setItem('userToChat', JSON.stringify({ id: id, fullName: name, accounttype: account, pic: image }))
        navigate('/message')
    }


    return (
        <div className={`flex items-center justify-between gap-4 bg-white-100 p-4 hover:bg-primary-20 group rounded-xl ${className}`}>
            <div className="flex items-center relative gap-2">
                <div className="relative">
                    <img src={image} alt="" className="h-12 w-12 rounded-full" />
                    {isOnline ? <span className="h-[10px] w-[10px] rounded-[50%] ml-2 bg-success-100 absolute top-0 right-0 block" ></span> : null}
                </div>
                <div className="flex flex-col">
                    <span className="group-hover:underline cursor-pointer">{name}</span>
                    <span className="text-black-80 text-small-1 ">{account}</span>
                </div>
            </div>
            <div className="flex items-center gap-8">
                {showProfileButton && <Button variant={"secondary"} onClick={() => navigate("/profile/:id")}>Profile</Button>}

                {showMessageButton && <i onClick={handleClick} className="bi bi-chat text-icon cursor-pointer"></i>}
                {showAddFriendButton && <Button variant={"ghost"} className="text-primary-100" onClick={handleFollow}>Suivre</Button>}
                {showRemoveFriendButton && <Button variant="ghost" onClick={handleUnfollow} className="text-danger-100">Retirer</Button>}
            </div>
        </div>
    )
}

export default RecentlyFriends;

/*
Amis.propTypes = {
    name: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired,
}

RecentlyFriends.propTypes = {
    name: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired,
}*/