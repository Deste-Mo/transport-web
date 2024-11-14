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
import useWindowSize from "../../hooks/useWindowSize.jsx";
import useFollowersHook from "../../hooks/useFollowersHook.js";
import {useNewUserContext} from "../../context/NewUserProvider.jsx";
//import PropTypes from "prop-types";

const RecentlyFriends = ({
                             spec,
                             image,
                             name,
                             account,
                             showMessageButton = false,
                             showRemoveFriendButton = false,
                             showAddFriendButton = false,
                             onButtonsClick = () => {
                             },
                             className,
                         }) => {
    const id = spec;
    const {token, personalInformation, profileInfo} = useAuth();
    const {
        // followUser,
        unFollowUsers,
    }
    = useUser();
    
    const {isMobile} = useApp();
    const {ActiveUsers} = useSocketContext();
    const navigate = useNavigate();
    const isOnline = ActiveUsers.includes(id);
    const {limitTextLen, showConfirmPopup} = useApp();
    const { followUser} = useNewUserContext();
    
    const navigateToMessage = () => {
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
    const goToUserProfile = () => navigate(`/profile/${id}`);
    
    const showConfirm = async () => {
        const userConfirmed = await showConfirmPopup("Voulez vous vraiment supprimer ce message ?")
        if (!userConfirmed)
            return

        unFollowUsers(profileInfo.id, id);
    }


    return (
        <div
            className={`flex items-center  justify-between  p-4 hover:bg-primary-d/10 dark:hover:bg-primary-l/10 group  text-black-100 dark:text-white-100 ${className}`}
        >
            <div className="flex items-center relative gap-2">
                <img src={image} alt="" className="size-10 rounded-full cursor-pointer"
                     onClick={() => goToUserProfile(id)}/>
                <div className="flex flex-col">
                    <span className="group-hover:underline cursor-pointer text-small-1"
                          onClick={() => goToUserProfile(id)}>
                        {isMobile ?  limitTextLen(name): name}{" "}
                        {isOnline && (
                            <span className="h-[10px] w-[10px] rounded-[50%] ml-2 bg-primary-100 inline-block"></span>)}
                    </span>
                    <span className="text-black-80 dark:text-white-80 text-small-2 ">
                    {account}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-center  gap-8">
                {showMessageButton && (
                    <Button
                        size="sm"
                        variant={"secondary-2"}
                        onClick={() => {
                            navigateToMessage();
                            onButtonsClick();
                        }}
                    >
                        Contacter
                    </Button>
                )}
                {(showAddFriendButton && personalInformation.id !== spec) && (
                    <Button
                        size="sm"
                        variant={"outline"}
                        onClick={() => {
                            followUser(profileInfo, id, personalInformation);
                            // followUser(profileInfo.id, id, personalInformation);
                            onButtonsClick();
                        }}
                    >
                        Suivre
                    </Button>
                )}
                {showRemoveFriendButton && (
                    <Button
                        size={'sm'}
                        variant="secondary-2"
                        onClick={() => {
                            showConfirm();
                            onButtonsClick();
                        }}
                    >
                        Retirer
                    </Button>
                )}
            </div>
        </div>
    );
    
};

export default RecentlyFriends;

