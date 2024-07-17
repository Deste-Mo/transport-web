import { useNavigate } from "react-router-dom";
import { SERVERLINK } from "../../constants";
import { useSocketContext } from "../../context/SocketContext";

const UserConv = ({ friend }) => {

    const { onlineUsers } = useSocketContext();

    const isOnline = onlineUsers.includes(friend.userid);

    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.setItem('userToChat', JSON.stringify({ id: friend.userid, fullName: friend.firstname + " " + friend.lastname, accounttype: friend.accounttype, pic: SERVERLINK + "/" + friend.profileimage }))
        navigate('/message')
    }

    return (
        <div className="cursor-pointer mx-3 flex flex-col justify-center relative items-center shadow-md p-3" onClick={e => handleClick(e)}>
            <img src={SERVERLINK + "/" + friend.profileimage} alt="" className="bg-black-20 w-[40px] h-[40px] rounded-full" />
            <span className="text-small-2 text-center text-black-80">{friend.firstname}</span>
            {isOnline ? <span className="h-[10px] w-[10px] rounded-[50%] bg-success-100 block absolute right-0 top-0" ></span> : null}
        </div>
    )
}

export default UserConv;