/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Button, FileInput, TextArea, TextInput } from "../../styles/components";
import { useAuth } from "../../context/AuthProvider";
import { useApp } from "../../context/AppPorvider";
import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { SERVERLINK } from "../../constants";
import Icon from "../../components/ui/Icon.jsx";
import { useForm } from "../../context/FormProvider.jsx";
import {appVariants} from "../../animations/variants.js";
import {motion} from "framer-motion";

const Messages = () => {

    const navigate = useNavigate();

    const { token } = useAuth();
    const { socket } = useSocketContext();
    
    const { messages, userToChat, getUnreadMessageCount, getUserMessages } = useApp()

    const [messInput, setMessInput] = useState("");

    const endOfMessagesRef = useRef(null);

    const { ActiveUsers } = useSocketContext();
    
    const { handleInputChange, checkFieldError, handleError } = useForm()

    const [formData, setFormData] = useState({
        fileContent: null,
        message: "",
        refMessage: "",
    })

    const [errorData, setErrorData] = useState({
        fileContent: false,
        message: false,
        refMessage: false,
    })

    const [file, setFile] = useState({
        name: '',
        path: ''
    });

    const isOnline = ActiveUsers.includes(JSON.parse(localStorage.getItem('userToChat')).id);


    const handleClick = () => {
        localStorage.removeItem('userToChat');
        navigate('/discussion');
    }
    



    useEffect(() => {
        getUserMessages(endOfMessagesRef);

        socket?.on("newMessage", async () => {
            // setMessages([...messages, await newMessage]);
            getUserMessages(endOfMessagesRef);
            getUnreadMessageCount();
        });

        return () => socket?.off("newMessage");

    }, [socket]);



    const handleSendMessage = async (e) => {
        e.preventDefault();

        const data = new FormData()

        for (const key in formData) {
            data.append(key, formData[key])
        }

        const userToChat = await JSON.parse(localStorage.getItem('userToChat')).id;

        const response = await fetch(SERVERLINK + '/api/messages/send/' + userToChat, {
            method: "POST",
            headers: {
                "token": token
            },
            body: data
        });

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
    
    return (
        <motion.section
            className="flex flex-col items-center justify-center w-full gap-4  rounded-xl bg-white-100 dark:bg-black-10  h-[85vh] relative overflow-hidden" variants={appVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div
                className="flex items-center justify-between w-full py-4 px-6 border-0 border-b border-b-black-20  bg-white-10 top-0 z-40">
                <div className="flex items-center justify-between ">
                    <Icon variant="ghost" icon="bi bi-chevron-left " onClick={handleClick} />
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="relative">
                            <img src={userToChat.pic} className={"size-[54px] rounded-full bg-black-20"} />
                            {isOnline ? <span className="h-[10px] w-[10px] rounded-[50%] ml-2 bg-success-100 absolute top-0 right-0 block" ></span> : null}
                        </div>
                        <p className={"text-black-100 dark:text-white-100 text-lead"}>{userToChat.fullName}<span
                            className="text-small-1 text-black-80 dark:text-white-80">({userToChat.accounttype})</span>
                        </p>
                    </div>
                </div>
                <Button variant="secondary">Profile</Button>
            </div>
            <div
                className="flex flex-col gap-4 items-start justify-start h-screen px-6 py-[24px] w-full scrollbar-none overflow-y-scroll ">
                {
                    messages?.length > 0 ? messages.map(message =>
                    (<>
                        {
                            (message.receiverid !== userToChat.id) ? (
                                <div key={message.messageid}  className="w-full flex justify-start">
                                    <Message
                                        conversationId={message.idconversation}
                                        messageId={message.messageid}
                                        handleShown={getUserMessages}
                                        fileContent={message.filecontent}
                                        formData={formData}
                                        setAnswer={setFormData}
                                        refmessage={message.refmessage}
                                        message={message.content}
                                        sentDate={message.sentdate} />
                                </div>
                            ) : (
                                <div className="w-full flex justify-end">
                                    <Message
                                        conversationId={message.idconversation}
                                        messageId={message.messageid}
                                        handleShown={getUserMessages}
                                        fileContent={message.filecontent}
                                        refmessage={message.refmessage}
                                        message={message.content}
                                        sentDate={message.sentdate} sentByCurrentUser />
                                </div>
                            )
                        }
                    </>
                    )) : (
                        <p className="text-black-40 w-full h-screen text-center flex items-center justify-center text-subtitle-3">
                            Envoyer un message!
                        </p>
                    )

                }
                <div ref={endOfMessagesRef} />
            </div>
            <div className="border-0 bg-white-10 px-6 py-4 w-full border-t border-t-black-20  bottom-0 z-40">
                {
                    formData.refMessage ?
                        <p className="max-w-[400px] break-words text-small-1 flex items-center justify-start rounded-xl text-black-60 p-1">
                            <Icon variant="ghost" icon="bi bi-arrow-90deg-down" className="-rotate-90" size="sm" />
                            {formData.refMessage}
                        </p>
                        :
                        null
                }
                {formData.fileContent ?
                    <Icon size="md" variant="ghost" icon="bi bi-image" />
                    :
                    null
                }
                <form className="flex items-center justify-between gap-4" onSubmit={handleSendMessage}>
                    <FileInput inputClassName=" hidden " className="w-min"
                        name="fileContent"
                        setFile={setFile}
                        onChange={(e) => handleInputChange(setFormData, e)}
                        onError={handleError(setErrorData)}
                        value={formData.fileContent}
                    />
                    <Icon size="md" variant="ghost" icon="bi bi-emoji-smile" />
                    <TextInput rounded="full" block
                        className="flex-1 outline-none bg-gray-100  text-base text-black-80 px-6 py-3"
                        placeholder="Ecrire un message ...."
                        name="message"
                        onError={handleError(setErrorData)}
                        onChange={(e) => handleInputChange(setFormData, e)}
                        value={formData.message}
                    />
                    <Icon onClick={handleSendMessage} icon="bi bi-arrow-up" size="sm" />
                </form>
            </div>
        </motion.section>
    )
}


const Message = ({ conversationId, messageId, message, sentDate, sentByCurrentUser = false, setAnswer, formData, refmessage, fileContent, handleShown }) => {

    const { timeSince } = useApp();

    const { token } = useAuth();

    const answerMessage = () => {
        setAnswer({ ...formData, ['refMessage']: message });
    }
    const handleDelete = async () => {
        const response = await fetch(SERVERLINK + '/api/messages/delete/' + messageId + "/" + conversationId, {
            method: "POST",
            headers: {
                "token": token
            }
        });

        const answer = await response.json();

        handleShown();
    }

    const fileTypes = ["jpg", "png", "jpeg", "gif"]

    return <div className="space-y-1 mt-3 max-w-[420px] text-wrap break-words">
        <p className="text-small-2 text-black-80 dark:text-white-80 dark:font-sm text-right pr-2">{timeSince(sentDate, 3)}</p>
        {
            fileContent
                ?
                <div>
                    {
                        refmessage ?
                        <p className="text-small-1 flex items-center justify-start rounded-xl text-black-60 dark:text-white-60 max-w-[300px] p-1"><Icon variant="ghost" icon="bi bi-arrow-90deg-down" className="-rotate-90" size="sm" />{refmessage}</p>
                            :
                            null
                    }
                    <a href={SERVERLINK + "/" + fileContent}>
                        {
                            fileTypes.includes(fileContent.split(".")[1].toLowerCase()) ?
                                <img src={SERVERLINK + "/" + fileContent} alt={fileContent} className="max-w-[200px] rounded-lg" />
                                :
                                <div>
                                    <Icon variant="ghost" icon="bi bi-file-earmark" size="lg" />
                                    <span className="text-black-40 dark:text-white-60">{fileContent}</span>
                                </div>
                        }
                    </a>
                </div>
                : null
        }
        {
            !message && fileContent ?
                null
                :
                <div>
                    {
                        refmessage ?
                            <p className="text-small-1 flex items-center justify-start rounded-xl text-black-60 max-w-[300px] p-1"><Icon variant="ghost" icon="bi bi-arrow-90deg-down" className="-rotate-90" size="sm" />{refmessage}</p>
                            :
                            null
                    }
                    <div className={`p-4  rounded-2xl space-y-3 w-full ${sentByCurrentUser ? 'bg-primary-20' : 'bg-black-10'}`}>
                        <p className="text-small-1 text-black-100 dark:text-white-100 ">{message}</p>
                    </div>
                </div>
        }

        <div className={`flex items-center  w-full gap-2 ${sentByCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <Icon onClick={handleDelete} variant="ghost" icon="bi bi-trash" size="sm" />
            {
                !sentByCurrentUser &&
                <Icon onClick={answerMessage} variant="ghost" icon="bi bi-arrow-90deg-down" className="-rotate-90" size="sm" />
            }
        </div>
    </div>
}

export default Messages;

