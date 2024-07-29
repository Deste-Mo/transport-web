import { useNavigate } from "react-router-dom";
import {SERVERLINK} from "../../../constants/index.js";
import {useSocketContext} from "../../../context/SocketContext.jsx";

const ActiveUser = ({ friend }) => {

    const { ActiveUsers } = useSocketContext();

    const isOnline = ActiveUsers.includes(friend.userid);

    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.setItem('userToChat', JSON.stringify({ id: friend.userid, fullName: friend.firstname + " " + friend.lastname, accounttype: friend.accounttype, pic: SERVERLINK + "/" + friend.profileimage }))
        navigate('/message')
    }

    return (
        <div className="cursor-pointer mx-3 flex flex-col justify-center relative items-center" onClick={e => handleClick(e)}>
            <img src={SERVERLINK + "/" + friend.profileimage} alt="" className="size-[46px] rounded-full" />
            <span className="text-small-1 text-center text-black-80 select-none">{friend.firstname.toUpperCase().slice(0,1) + friend.firstname.toLowerCase().slice(1)}</span>
            {isOnline ? <span className="size-[10px] rounded-[50%] bg-primary-100 block absolute right-0 top-0" ></span> : null}
        </div>
    )
}

export default ActiveUser;