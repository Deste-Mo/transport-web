import {useNavigate} from "react-router-dom";
import Button from "../ui/Button";
import {SubHeader} from "./SubHeader";
import {useAuth} from "../../context/AuthProvider";
import {SERVERLINK} from "../../constants";
import {useApp} from "../../context/AppProvider";
import {useSocketContext} from "../../context/SocketContext";
import {useEffect, useState} from "react";
import FriendCardLoading from "../loader/FriendCardLoading";
import {useUser} from "../../context/UserProvider.jsx";
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
                                
                         }) => {
    const {token, personalInformation} = useAuth();
    const MAX_NAME_LEN = 25;

    const {loading} = useApp();
    const {
        getFriends,
        getUsers,
        followUser,
        unFollowUsers,// TODO : Forget the usage (empty function)
    }
        = useUser();

    const {ActiveUsers} = useSocketContext();

    const navigate = useNavigate();

    const id = spec;

    const isOnline = ActiveUsers.includes(id);

    const handleFollow = async () => {
        const response = await fetch(SERVERLINK + "/api/profile/follow/" + id, {
            method: "POST", headers: {
                "Content-Type": "application/json", token: token,
            },
        });

        const answer = await response.json();
        getFriends();
        handleUsersToShow();
        console.log(answer);
    };

    const handleUnfollow = async () => {
        const response = await fetch(SERVERLINK + "/api/profile/unfollow/" + id, {
            method: "POST", headers: {
                "Content-Type": "application/json", token: token,
            },
        });

        const answer = await response.json();

        getFriends();
        handleUsersToShow();
        console.log(answer);
    };

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
    
    const navigateToProfile = () => navigate(`/profile/${id}`)


    return (
        <div
            className={`flex items-center flex-wrap justify-between gap-3 bg-white-100 p-4 hover:bg-primary-20 group rounded-xl dark:bg-black-100 text-black-100 dark:text-white-100 ${className}`}
        >
            <div className="flex items-center relative gap-2">
                <img src={image} alt="" className="h-12 w-12 rounded-full cursor-pointer " onClick={navigateToProfile}/>
                <div className="flex flex-col text-small-1">
                    <span className="group-hover:underline cursor-pointer " onClick={navigateToProfile}>
                        {name.slice(0,MAX_NAME_LEN)}{name.length > MAX_NAME_LEN && "..."}
                        {isOnline && (
                            <span className="h-[10px] w-[10px] rounded-[50%] ml-2 bg-primary-100 inline-block"></span>)}
                    </span>
                    <span className="text-black-80 dark:text-white-80 text-small-2 ">
                    {account}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-8">
                

                {showMessageButton && (
                    <i
                        onClick={handleClick}
                        className="bi bi-chat text-icon cursor-pointer"
                    ></i>
                )}
                {showAddFriendButton && (
                    <Button
                        variant={"ghost"}
                        className="text-primary-100"
                        size="sm"
                        onClick={() => followUser(id, personalInformation)}
                    >
                        Suivre
                    </Button>
                )}
                {showRemoveFriendButton && (
                    <Button
                        variant="ghost"
                        onClick={() => unFollowUsers(id)}
                        className="text-danger-100"
                        size="sm"
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
