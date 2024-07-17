import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"
import { ForAll } from "./ForAll"
import { useAuth } from "../../context/AuthProvider"
import { SERVERLINK } from "../../constants"
import { useApp } from "../../context/AppPorvider"
import { useSocketContext } from "../../context/SocketContext"
//import PropTypes from "prop-types";

const RecentlyFriends = ({ spec, image, name, account, message = false, retire = false, ajouter = false, className }) => {

    const { token } = useAuth();

    const { handleFriends, handleUsersToShow } = useApp();

    const { onlineUsers } = useSocketContext();


    const navigate = useNavigate();

    const id = spec;

    const isOnline = onlineUsers.includes(id);

    const handleFollow = async () => {

        const response = await fetch(SERVERLINK + '/api/profile/follow/' + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        const answer = await response.json();
        handleFriends()
        handleUsersToShow()
        console.log(answer);
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
        console.log(answer);

    }

    const handleClick = () => {
        localStorage.setItem('userToChat', JSON.stringify({ id: id, fullName: name, accounttype: account, pic: image }))
        navigate('/message')
    }

    return (
        <div className={`flex items-center justify-between gap-4 bg-white-100 p-2 rounded-lg ${className}`}>
            <div className="flex items-center relative gap-2">
                <img src={image} alt="" className="h-12 w-12 rounded-full" />
                <div className="flex flex-col">
                    <span>{name}{isOnline ? <span className="h-[10px] w-[10px] rounded-[50%] ml-2 bg-success-100 inline-block" ></span> : null}</span>
                    <span className="rounded-lg p-1 bg-primary-40 w-fit">{account}</span>
                </div>
            </div>
            <div className="flex items-center gap-8">
                {message ? <i onClick={handleClick} className="bi bi-chat-dots text-icon cursor-pointer"></i> : null}
                <Button rounded="md" onClick={() => navigate("/profile/:id")}>Profile</Button>
                {ajouter ? <Button rounded="md" className="bg-white-100 border-primary-100 border text-primary-100 hover:text-black-100" onClick={handleFollow}>Suivre</Button> : null}
                {retire ? <Button rounded="md" variant="danger" onClick={handleUnfollow} className="border-danger-100 border text-danger-100 hover:text-black-100">Retirer</Button> : null}
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
