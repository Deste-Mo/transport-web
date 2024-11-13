/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider.jsx";
import { SERVERLINK } from "../../../constants/index.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import ProfileImage from "../../../assets/images/OIP.jpg";
import { useApp } from "../../../context/AppProvider.jsx";
import useWindowSize from "../../../hooks/useWindowSize.jsx";

const Conv = ({ id, userToChat }) => {
  const navigate = useNavigate();
  const [width] = useWindowSize();

  const { token, personalInformation } = useAuth();

    const { timeSince, countUnread } = useApp();

  const image = SERVERLINK + "/" + userToChat?.profileimage;

  const [isViewed, setViewed] = useState(false);

  const handleClick = () => {
        localStorage.setItem('userToChat', JSON.stringify({ id: userToChat.userid, fullName: userToChat.firstname + (!userToChat.lastname ? '' : (" " + userToChat.lastname)) , accounttype: userToChat.accounttype, pic: image }))
        navigate('/message')
    }

  const { ActiveUsers } = useSocketContext();

  const isOnline = ActiveUsers.includes(userToChat.userid);

  useEffect(() => {
    // console.log(ActiveUsers);
    const verifyStatus = async () => {
      const response = await fetch(
        SERVERLINK + "/api/messages/seen/" + userToChat.userid,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      const verification = await response.json();

      setViewed(await verification.allSeen);
        }
    verifyStatus();

    }, [countUnread])

  return (
    <div
      className={`flex select-none items-center justify-between cursor-pointer w-full hover:bg-primary-d/10 dark:hover:bg-primary-l/10 p-6 max-md:p-4 ${
        isViewed ? "bg-secondary-l dark:bg-secondary-d " : "bg-accent-d/10"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            className="size-[40px] object-cover rounded-full"
            src={image || "../../assets/images/OIP.jpg"}
          />
          {isOnline ? (
            <span className="h-[10px] w-[10px] rounded-[50%] ml-2 bg-primary-100 absolute top-0 right-0 block"></span>
          ) : null}
        </div>
        <div className="flex flex-col items-start  break-words text-wrap">
          <p className="text-black-100 dark:text-white-100 text-small-1">
          {userToChat.firstname + (userToChat.lastname ? " " + userToChat.lastname : '')}
          </p>
          <p className="font-sm text-small-2 text-text-sec-l dark:text-text-sec-d">
            {userToChat.accounttype}
          </p>
          <div
            className={`${
              isViewed
                ? "text-text-sec-l dark:text-text-sec-d dark:font-sm"
                : "text-text-l dark:text-text-d font-bold "
            }   text-small-1 flex items-center gap-1`}
          >
            <span>
              {personalInformation.id === userToChat.lastsender
                ? "Vous : "
                : "Nouveau : "}
            </span>
            <span className="overflow-hidden">
              {" " + userToChat?.lastmessage?.length >  (width <= 760 ? 10 : 40)
                ? userToChat.lastmessage.slice(0, (width <= 760 ? 10 : 40)) + " ..."
                : userToChat.lastmessage}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {!isViewed && (
          <div className={`size-[10px] rounded-full bg-primary-100 `} />
        )}
        <p
          className={
            "text-small-2 text-black-80 dark:text-white-100 dark:font-sm font-light"
          }
        >
          {timeSince(userToChat.lastdate, 3)}
        </p>
      </div>
    </div>
  );
};

export default Conv;
