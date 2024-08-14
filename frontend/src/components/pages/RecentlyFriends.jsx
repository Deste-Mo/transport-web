import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { SubHeader } from "./SubHeader";
import { useAuth } from "../../context/AuthProvider";
import { SERVERLINK } from "../../constants";
import { useApp } from "../../context/AppPorvider";
import { useSocketContext } from "../../context/SocketContext";
import { useEffect, useState } from "react";
import FriendCardLoading from "../loader/FriendCardLoading";
import { useUser } from "../../context/UserProvider.jsx";
//import PropTypes from "prop-types";

const RecentlyFriends = ({
    spec,
    image,
    name,
    account,
    showMessageButton = false,
    showRemoveFriendButton = false,
    showAddFriendButton = false,
    showProfileButton = true,
    className,
    isFriend,
}) => {
    const { token, personalInformation, profileInfo } = useAuth();

    
    const { loading } = useApp();
    
    const {
        followUser,
        goToUserProfile,
        unFollowUsers,// TODO : Forget the usage (empty function)
    }
    = useUser();

    const { ActiveUsers } = useSocketContext();

    const navigate = useNavigate();

    const id = spec;

    const isOnline = ActiveUsers.includes(id);

    const handleClick = () => {
        localStorage.setItem(
            "userToChat",
            JSON.stringify({
                id: id,
                fullName: name,
                accounttype: account,
                pic: image,
            })
        );
        navigate("/message");
    };

    // useEffect(() => {
    //     setIsFriend(friends.find(friend => friend.userid = id))
    // }, [friends, id])


    return (
        <div
            className={`flex items-center max-lg:flex-wrap justify-between gap-4 bg-white-100 p-4 hover:bg-primary-20 group rounded-xl dark:bg-black-100 text-black-100 dark:text-white-100 ${className}`}
        >
            <div className="flex items-center relative gap-2">
                <img src={image} alt="" className="h-12 w-12 rounded-full cursor-pointer" onClick={() => goToUserProfile(id)}/>
                <div className="flex flex-col">
                    <span className="group-hover:underline cursor-pointer" onClick={() => goToUserProfile(id)}>
                        {name}{" "}
                        {isOnline && (
                            <span className="h-[10px] w-[10px] rounded-[50%] ml-2 bg-primary-100 inline-block"></span>)}
                    </span>
                    <span className="text-black-80 dark:text-white-80 text-small-1 ">
                        {account}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-8">
                {showProfileButton && (
                    <Button variant="secondary" onClick={() => goToUserProfile(id)}>
                        {personalInformation.id === spec && "Mon "}Profile
                    </Button>
                )}

                {showMessageButton && (
                    <i
                        onClick={handleClick}
                        className="bi bi-chat text-icon cursor-pointer"
                    ></i>
                )}
                {(showAddFriendButton && personalInformation.id !== spec) && (
                    <Button
                        variant={"ghost"}
                        className="text-primary-100"
                        onClick={() => followUser(profileInfo.id, id, personalInformation)}
                    >
                        Suivre
                    </Button>
                )}
                {showRemoveFriendButton && (
                    <Button
                        variant="ghost"
                        onClick={() => unFollowUsers(profileInfo.id, id)}
                        className="text-danger-100"
                    >
                        Retirer
                    </Button>
                )}
            </div>
        </div>
    );
};

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
