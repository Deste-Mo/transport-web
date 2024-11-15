/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {useNavigate} from "react-router-dom";
import {
    Button,
    FileInput,
    TextArea,
    TextInput,
} from "../../styles/components";
import TemplatePopup, {
    OptionItem,
} from "../../components/ui/TemplatePopup.jsx";
import {useAuth} from "../../context/AuthProvider";
import {useApp} from "../../context/AppProvider";
import {useEffect, useMemo, useRef, useState} from "react";
import {useSocketContext} from "../../context/SocketContext";
import {BREAKPOINTS, SERVERLINK} from "../../constants";
import Mess from "../../components/pages/conversations/Message.jsx";
import Icon from "../../components/ui/Icon.jsx";
import {Input} from "postcss";
import {useForm} from "../../context/FormProvider.jsx";
import {appVariants} from "../../animations/variants.js";
import {motion} from "framer-motion";
import {useUser} from "../../context/UserProvider.jsx";
import {useAnimation} from "../../context/AnimationProvider.jsx";
import useWindowSize from "../../hooks/useWindowSize.jsx";
import ConfirmPopup from "../../components/ui/ConfirmPopup.jsx";

const Messages = () => {
    const navigate = useNavigate();
    const {token} = useAuth();

    const {goToUserProfile} = useUser();

    const {messages, userToChat, getUnreadMessageCount, getUserMessages, countUnread} = useApp()

    const [messInput, setMessInput] = useState("");
    const endOfMessagesRef = useRef(null);
    const {ActiveUsers} = useSocketContext();
    const [answerMess, setAnswer] = useState('');
    const {handleInputChange, checkFieldError, handleError} = useForm();
    const {socket} = useSocketContext();
    const {setHideMobileNavigation, hideMobileNavigation} = useAnimation();
    const [width] = useWindowSize();

    const [formData, setFormData] = useState({
        fileContent: null,
        message: "",
        refMessage: "",
    });

    const [errorData, setErrorData] = useState({
        fileContent: false,
        message: false,
        refMessage: false,
    });

    const [file, setFile] = useState({
        name: "",
        path: "",
    });

    const isOnline = ActiveUsers.includes(
        JSON.parse(localStorage.getItem("userToChat")).id
    );

    const handleClick = () => {
        localStorage.removeItem('userToChat');
        navigate('/discussion');
    }
    const navigateToProfile = () => navigate(`/profile/${userToChat.id}`)


    const handleSendMessage = async (e) => {
        e.preventDefault();

        const data = new FormData();

        for (const key in formData) {
            data.append(key, formData[key]);
        }
        
        const userToChat = await JSON.parse(localStorage.getItem("userToChat")).id;

        const response = await fetch(
            SERVERLINK + "/api/messages/send/" + userToChat,
            {
                method: "POST",
                headers: {
                    token: token,
                },
                body: data,
            }
        );

        const answer = await response.json();

        getUserMessages(endOfMessagesRef);

        setFormData({
            fileContent: null,
            message: "",
            refMessage: "",
        })

        setFile({
            name: '',
            path: ''
        })

    }

    useMemo(() => {
        setHideMobileNavigation(true)
    }, [hideMobileNavigation]);


    useEffect(() => {
        socket?.on("newMessage", () => {
            getUserMessages(endOfMessagesRef);
            getUnreadMessageCount();
        });

        return () => socket?.off("newMessage")

    }, [socket, countUnread, getUnreadMessageCount, getUserMessages]);

    useEffect(() => {
        getUserMessages(endOfMessagesRef);
        getUnreadMessageCount();
    }, [countUnread]);

    return (
        <motion.section
            className="flex flex-col items-center justify-center w-full gap-0 rounded-xl bg-white-100 dark:bg-black-10  h-[85vh] max-md:h-full relative overflow-hidden"
            variants={appVariants}
            initial={false}
            whileInView={!hideMobileNavigation && "visible"}
            viewport={{once: true}}
        >
            <div
                className="flex items-center justify-between w-full py-4 px-3 border-0 border-b border-b-black-20  bg-white-10 top-0 z-40 max-md:fixed max-md:top-0 bg-white-100 dark:bg-white-0">
                {/* Message header */}
                <div className="flex items-center justify-between gap-3 ">
                    <Icon
                        variant="ghost"
                        icon="bi bi-chevron-left "
                        onClick={handleClick}
                    />
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div
                            className="relative cursor-pointer"
                            onClick={() => goToUserProfile(userToChat.id)}
                        >
                            <img
                                src={userToChat?.pic}
                                className={"size-12 rounded-full bg-black-20"}
                            />
                            {isOnline && (
                                <span
                                    className="h-[10px] w-[10px] rounded-[50%] ml-2 bg-primary-100 absolute top-0 right-0 block"></span>
                            )}
                        </div>
                        <div
                            className={
                                "text-black-100 dark:text-white-100 text-lead cursor-pointer "
                            }
                            onClick={() => goToUserProfile(userToChat.id)}
                        >
                            <p className="hover:underline">{userToChat?.fullName}</p>
                            <span className="text-small-2 text-black-80 dark:text-white-80">
                {userToChat?.accountType}
              </span>
                        </div>
                    </div>
                </div>
                {/* <Button
          variant="secondary"
          onClick={() => goToUserProfile(userToChat.id)}
        >
          Profile
        </Button> */}
            </div>

            {/* Messages and profile container */}
            <div
                className="flex flex-col gap-10  items-start justify-start h-full px-4 py-[24px] max-md:py-10 w-full scrollbar-none overflow-y-scroll ">
                {/* Big profile */}
                <div className="flex items-center flex-col self-center gap-3 cursor-pointer pb-3">
                    <div
                        className="relative cursor-pointer"
                        onClick={() => goToUserProfile(userToChat.id)}
                    >
                        <img
                            src={userToChat.pic}
                            className={"size-[134px] rounded-full bg-black-20"}
                        />
                        {isOnline && (
                            <span
                                className="size-[20px] rounded-[50%] ml-2 bg-primary-100 absolute top-0 right-0 block"></span>
                        )}
                    </div>
                    <div
                        className={
                            "text-black-100 flex flex-col items-center justify-center dark:text-white-100 text-lead cursor-pointer"
                        }
                        onClick={() => goToUserProfile(userToChat.id)}
                    >
                        <p className=" hover:underline">{userToChat.fullName}</p>
                        <span className="text-small-2 text-black-80 dark:text-white-80 block">
              {userToChat.accountType}
            </span>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex flex-col gap-10 w-full">
                    {messages?.length > 0 ? (
                        messages.map((message) => (
                            <>
                                <div
                                    key={message.messageid}
                                    className={`w-full flex ${message.receiverid !== userToChat.id
                                        ? "justify-start"
                                        : "justify-end"
                                    }`}
                                >
                                    {
                                        (message.bysender === 1 && message.byreceiver < 1)
                                            ?
                                            <Message
                                                conversationId={message.idconversation}
                                                messageId={message.messageid}
                                                handleShown={getUserMessages}
                                                fileContent={message.filecontent}
                                                formData={formData}
                                                setAnswer={setFormData}
                                                refmessage={message.refmessage}
                                                message={message}
                                                sentDate={message.sentdate}
                                                receiverid={message.receiverid}
                                                sentByCurrentUser={message.receiverid === userToChat.id}
                                                otherId={userToChat.id}
                                            />
                                            :
                                            // Supprimer pour le receveur
                                            (message.bysender > 0 && message.byreceiver > 0)
                                                ?
                                                !(message.receiverid === userToChat.id)
                                                    ?
                                                    null
                                                    :
                                                    (message.bysender > 1 && (message.receiverid === userToChat.id))
                                                        ?
                                                        null
                                                        :
                                                        <Message
                                                            conversationId={message.idconversation}
                                                            messageId={message.messageid}
                                                            handleShown={getUserMessages}
                                                            fileContent={message.filecontent}
                                                            formData={formData}
                                                            setAnswer={setFormData}
                                                            refmessage={message.refmessage}
                                                            message={message}
                                                            sentDate={message.sentdate}
                                                            receiverid={message.receiverid}
                                                            sentByCurrentUser={message.receiverid === userToChat.id}
                                                            otherId={userToChat.id}
                                                        />
                                                :
                                                (message.bysender > 1 && message.byreceiver < 1)
                                                    ?
                                                    (message.receiverid === userToChat.id)
                                                        ?
                                                        null
                                                        :
                                                        <Message
                                                            conversationId={message.idconversation}
                                                            messageId={message.messageid}
                                                            handleShown={getUserMessages}
                                                            fileContent={message.filecontent}
                                                            formData={formData}
                                                            setAnswer={setFormData}
                                                            refmessage={message.refmessage}
                                                            message={message}
                                                            sentDate={message.sentdate}
                                                            receiverid={message.receiverid}
                                                            sentByCurrentUser={message.receiverid === userToChat.id}
                                                            otherId={userToChat.id}
                                                        />
                                                    :
                                                    (message.bysender < 1 && message.byreceiver > 0)
                                                        ?
                                                        !(message.receiverid === userToChat.id)
                                                            ?
                                                            null
                                                            :
                                                            <Message
                                                                conversationId={message.idconversation}
                                                                messageId={message.messageid}
                                                                handleShown={getUserMessages}
                                                                fileContent={message.filecontent}
                                                                formData={formData}
                                                                setAnswer={setFormData}
                                                                refmessage={message.refmessage}
                                                                message={message}
                                                                sentDate={message.sentdate}
                                                                receiverid={message.receiverid}
                                                                sentByCurrentUser={message.receiverid === userToChat.id}
                                                                otherId={userToChat.id}
                                                            />
                                                        :
                                                        <Message
                                                            conversationId={message.idconversation}
                                                            messageId={message.messageid}
                                                            handleShown={getUserMessages}
                                                            fileContent={message.filecontent}
                                                            formData={formData}
                                                            setAnswer={setFormData}
                                                            refmessage={message.refmessage}
                                                            message={message}
                                                            sentDate={message.sentdate}
                                                            receiverid={message.receiverid}
                                                            sentByCurrentUser={message.receiverid === userToChat.id}
                                                            otherId={userToChat.id}
                                                        />
                                    }
                                </div>
                            </>
                        ))
                    ) : (
                        <p className="text-black-40 dark:text-white-100 w-full  text-center flex items-center justify-center text-subtitle-3">
                            Soyez le premier à discuter
                        </p>
                    )}
                    <div ref={endOfMessagesRef}/>
                </div>
            </div>

            {/* Input container */}
            <div
                className="border-0 bg-white-10 px-3 py-4 w-full border-t border-t-black-20  bottom-0 z-40 max-md:fixed max-md:bottom-0 bg-white-100 dark:bg-white-0 ">
                {/* Reply component for text messages */}
                {formData.refMessage && (
                    <div className="space-y-1 w-full">
                        <div className="flex items-center justify-between">
                            <p className="text-base text-black-100 dark:text-white-100">
                                {userToChat.fullName}
                            </p>
                            <Icon
                                onClick={() => {
                                    // TODO : Close reply message
                                    setFormData({...formData, ["refMessage"]: ''})
                                }}
                                icon="bi bi-x-circle" size="md" variant="ghost"/>
                        </div>
                        <div
                            className="max-w-[80%] break-words text-small-1 flex items-center justify-start gap-2 rounded-xl text-black-60 dark:text-white-60 p-1">
                            <Icon
                                variant="ghost"
                                icon="bi bi-reply-fill"
                                className="rotate-180"
                                size="sm"
                            />
                            <p>{formData.refMessage}</p>
                        </div>
                    </div>
                )}

                {/* Reply component for file message */}
                {formData.fileContent && (
                    <Icon size="md" variant="ghost" icon="bi bi-image"/>
                )}
                <form
                    className="flex items-center justify-between gap-3"
                    onSubmit={handleSendMessage}
                >
                    <FileInput
                        inputClassName=" hidden "
                        className="w-min"
                        name="fileContent"
                        setFile={setFile}
                        onChange={(e) => handleInputChange(setFormData, e)}
                        onError={handleError(setErrorData)}
                        value={formData.fileContent}
                        iconVariant="ghost"
                    />
                    {/*  <Icon
            size="md"
            variant="ghost"
            icon="bi bi-emoji-smile"
            className="max-md:hidden"
          />*/}
                    <TextInput
                        rounded="full"
                        block
                        className="flex-1 outline-none bg-gray-100  text-base text-black-80 px-6 py-3 max-md:px-3 max-md:py-2"
                        placeholder="Ecrire un message ...."
                        name="message"
                        onError={handleError(setErrorData)}
                        onChange={(e) => handleInputChange(setFormData, e)}
                        value={formData.message}
                    />
                    <Icon onClick={handleSendMessage} icon="bi bi-arrow-up" size="sm"/>
                </form>
            </div>
        </motion.section>
    );
};

const Message = ({
                     conversationId,
                     messageId,
                     message,
                     sentDate,
                     sentByCurrentUser = false,
                     setAnswer,
                     formData,
                     refmessage,
                     fileContent,
                     otherId,
                 }) => {
    const {timeSince} = useApp();
    const {token} = useAuth();
    const {showConfirmPopup, getUserMessages, getUnreadMessageCount, countUnread, confirmPopup} = useApp();
    const [messagePopupVisible, setMessagePopuVisible] = useState(false);
    const endOfMessagesRef = useRef(null);


    
    
    const answerMessage = () => {
        setAnswer({...formData, ["refMessage"]: message.content});
    };

    const handleDelete = async () => {
        const userConfirmed = await showConfirmPopup("Voulez vous vraiment supprimer ce message ?")
        if (!userConfirmed)
            return
        
        const response = await fetch(
            SERVERLINK + "/api/messages/delete/" + messageId + "/" + conversationId,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify({sentByCurrentUser, otherId})
            }
        );
        const answer = await response.json();
        await getUserMessages(endOfMessagesRef);
        
    }

    const handleDeleteForMe = async () => {
        const userConfirmed = await showConfirmPopup("Voulez vous vraiment supprimer ce message ?")
        if (!userConfirmed)
            return
        
        const response = await fetch(
            SERVERLINK + "/api/messages/deleteforme/" + messageId,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
                body: JSON.stringify({sentByCurrentUser})
            }
        );

        const answer = await response.json();

        await getUserMessages(endOfMessagesRef);
    }


    return (
        <>
            <div
                className={`flex items-center flex-col ${sentByCurrentUser ? "justify-end" : "justify-start"
                } ${refmessage ? "gap-0" : "gap-2"} max-w-[85%] text-wrap  break-words `}
            >

                <p
                    className={`text-small-2 text-black-80 dark:text-white-80 dark:font-sm w-full ${sentByCurrentUser ? "text-right pr-3" : "text-left pl-3"
                    }  `}
                >
                    {timeSince(sentDate, 3)}
                </p>

                <div
                    className={`flex  gap-2 w-full items-center relative ${sentByCurrentUser ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                    <TemplatePopup
                        setPopupVisible={setMessagePopuVisible}
                        popupVisible={messagePopupVisible}
                        className={`absolute top-10 ${sentByCurrentUser ? "-left-10 " : "-right-10"
                        }`}
                    >
                        <div>
                            {
                                message.bysender < 1 ?
                                    <OptionItem
                                        setPopupVisible={setMessagePopuVisible}
                                        name="Supprimer"
                                        icon="bi bi-trash"
                                        inverseIcon
                                        onClick={handleDelete}
                                    />
                                    :
                                    <OptionItem
                                        setPopupVisible={setMessagePopuVisible}
                                        name="Supprimer pour moi"
                                        icon="bi bi-trash"
                                        inverseIcon
                                        onClick={handleDeleteForMe}
                                    />
                            }
                            {(!sentByCurrentUser && message.bysender < 1) && (
                                <OptionItem
                                    name="Répondre"
                                    icon="bi bi-reply-fill"
                                    inverseIcon
                                    onClick={answerMessage}
                                    setPopupVisible={setMessagePopuVisible}
                                />
                            )}
                        </div>
                    </TemplatePopup>
                    <div className="flex flex-col gap-2 w-full">
                        {/* FileMessages */}
                        {(fileContent && message.bysender < 1) && (
                            <FileMessage
                                fileContent={fileContent}
                                refMessage={refmessage}
                                sentByCurrentUser={sentByCurrentUser}
                            />
                        )}
                        {/* TextMessages */}
                        {
                            ((!message.bysender && !sentByCurrentUser) && message.delmessage)
                                ?
                                <TextMessage
                                    sentByCurrentUser={sentByCurrentUser}
                                    message={message.delmessage}
                                    isDel
                                />
                                // null
                                :
                                (message.bysender > 0) ?
                                    <TextMessage
                                        sentByCurrentUser={sentByCurrentUser}
                                        message={message.delmessage}
                                        isDel
                                    />
                                    :
                                    (!message.content && fileContent) ? null : (
                                        <TextMessage
                                            refMessage={(!fileContent) && refmessage}
                                            sentByCurrentUser={sentByCurrentUser}
                                            message={message.content}
                                        />
                                    )
                        }
                    </div>
                    {

                        (message.bysender > 1 && message.byreceiver < 1)
                            ?
                            !sentByCurrentUser
                                ?
                                <Icon
                                    onClick={() => setMessagePopuVisible((prev) => !prev)}
                                    variant="ghost"
                                    icon="bi bi-three-dots"
                                    className="rotate-90"
                                    size="sm"
                                />
                                :
                                null
                            :
                            (message.bysender < 2 && message.byreceiver > 0)
                                ?
                                sentByCurrentUser
                                    ?
                                    <Icon
                                        onClick={() => setMessagePopuVisible((prev) => !prev)}
                                        variant="ghost"
                                        icon="bi bi-three-dots"
                                        className="rotate-90"
                                        size="sm"
                                    />
                                    :
                                    null
                                :
                                <div className="flex items-center gap-2">
                                    {
                                        !(message.bysender > 0) &&
                                        <Icon
                                            onClick={answerMessage}
                                            variant="ghost"
                                            icon="bi bi-reply-fill"
                                            className="-rotate-180"
                                            size="md"
                                        />
                                    }
                                    <Icon
                                        onClick={() => setMessagePopuVisible((prev) => !prev)}
                                        variant="ghost"
                                        icon="bi bi-three-dots"
                                        className="rotate-90"
                                        size="sm"
                                    />
                                </div>
                    }
                </div>
            </div>
        </>
    );
};

const FileMessage = ({fileContent, refMessage, sentByCurrentUser}) => {
    const fileTypes = ["jpg", "png", "jpeg", "gif", "pdf"];

    return (
        <div
            className={`w-full flex flex-col ${sentByCurrentUser ? "items-end" : "items-start"
            }`}
        >
            {/* For responded messages */}
            {refMessage && <RefMessage refMessage={refMessage}/>}
            <a href={SERVERLINK + "/" + fileContent} target="_blank">
                {/* For images */}
                {fileTypes.includes(fileContent.split(".")[1].toLowerCase()) ? (
                    <img
                        src={SERVERLINK + "/" + fileContent}
                        alt={fileContent}
                        className="max-h-full object-cover rounded-xl dark:text-white-100 text-black-100"
                    />
                ) : (
                    // {For other files}
                    <div className="flex items-center gap-1">
                        <Icon variant="ghost" icon="bi bi-file-earmark-fill" size="md"/>
                        <span className="text-black-40 dark:text-white-60">
              {fileContent.length > 130
                  ? fileContent.slice(0, 130) + "..."
                  : fileContent}
            </span>
                    </div>
                )}
            </a>
        </div>
    );
};

const TextMessage = ({refMessage, sentByCurrentUser, message, isDel}) => {
    return (
        <div
            className={`w-full  flex flex-col ${sentByCurrentUser ? "items-end" : "items-start"
            }`}
        >
            {/* For responded messages */}
            {refMessage && <RefMessage refMessage={refMessage}/>}
            <div
                className={`px-4 py-3  rounded-3xl  min-w-[40px] w-fit max-w-full text-wrap  break-words ${(sentByCurrentUser && !isDel) ? "bg-primary-80 " : isDel ? "bg-black-0 border-white-60 border" : "bg-black-0 "
                }`}
            >
                <p className={`text-small-1 ${!isDel ? "text-black-100 dark:text-white-100" : "text-white-40"} `}>
                    {message}
                </p>
            </div>
        </div>

    );
};

const RefMessage = ({refMessage, className}) => {
    return (
        <div
            className={`flex items-center text-small-1 jusify-end  text-black-60 dark:text-white-60 w-fit space-x-2 bg-black-10 px-4 pt-1 pb-4 rounded-3xl translate-y-3 ${className}`}
        >
            <Icon variant="ghost" icon="bi bi-reply-fill" size="md"/>
            <span>{refMessage}</span>
        </div>
    );
};

export default Messages;
