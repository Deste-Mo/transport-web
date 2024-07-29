import { useNavigate } from "react-router-dom";
import { Button, TextArea, TextInput } from "../../styles/components";
import { useAuth } from "../../context/AuthProvider";
import { useApp } from "../../context/AppPorvider";
import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { SERVERLINK } from "../../constants";
import Mess from "../../components/pages/conversations/Message.jsx";
import Icon from "../../components/ui/Icon.jsx";
import { Input } from "postcss";

const Messages = () => {


    const navigate = useNavigate();

    const { token } = useAuth();

    const { messages, userToChat, handleCountUnread, handleShown } = useApp()

    const [messInput, setMessInput] = useState("");

    const endOfMessagesRef = useRef(null);

    const { ActiveUsers } = useSocketContext();

    const isOnline = ActiveUsers.includes(JSON.parse(localStorage.getItem('userToChat')).id);


    const handleClick = () => {
        localStorage.removeItem('userToChat');
        navigate('/discussion');
    }

    const handleInputChange = (e) => {
        setMessInput(e.target.value)
    }

    const { socket } = useSocketContext();


    useEffect(() => {

        handleShown(endOfMessagesRef);

        socket?.on("newMessage", async () => {
            // setMessages([...messages, await newMessage]);
            handleShown(endOfMessagesRef);
            handleCountUnread();
        });

        return () => socket?.off("newMessage");

    }, [socket]);



    const handleSendMessage = async (e) => {
        e.preventDefault();

        const userToChat = await JSON.parse(localStorage.getItem('userToChat')).id;

        const response = await fetch(SERVERLINK + '/api/messages/send/' + userToChat, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify({ message: messInput })
        });

        const answer = await response.json();

        handleShown(endOfMessagesRef);

        console.log(answer);
        setMessInput("");
    }
    return (
        <section
            className="flex flex-col items-center justify-center w-full gap-4  rounded-xl bg-white-100 h-[85vh] relative overflow-hidden">
            <div
                className="flex items-center justify-between w-full py-4 px-6 border-0 border-b border-b-black-20  bg-white-100 top-0 z-40">
                <div className="flex items-center justify-between ">
                    <Icon variant="ghost" icon="bi bi-chevron-left " onClick={handleClick} />
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="relative">
                            <img src={userToChat.pic} className={"size-[54px] rounded-full bg-black-20"} />
                            {isOnline ? <span className="h-[10px] w-[10px] rounded-[50%] ml-2 bg-success-100 absolute top-0 right-0 block" ></span> : null}
                        </div>
                        <p className={"text-black-100 text-lead"}>{userToChat.fullName}<span
                            className="text-small-1 text-black-80">({userToChat.accounttype})</span>
                        </p>
                    </div>
                </div>
                <Button variant="secondary">Profile</Button>
            </div>
            <div
                className="flex flex-col gap-4 items-start justify-start h-screen px-6 py-[24px] w-full scrollbar-none overflow-y-scroll ">
                {
                    messages.length > 0 ? messages.map(message =>
                    (<>
                        {
                            !(message.receiverid === userToChat.id) ? (
                                <div className="w-full flex justify-start">
                                    <Message
                                        message={message.content}
                                        sentDate={message.sentdate} />
                                </div>
                            ) : (
                                <div className="w-full flex justify-end">
                                    <Message
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
            <div className="border-0 bg-white-100 px-6 py-4 w-full border-t border-t-black-20  bottom-0 z-40">
                <form className="flex items-center justify-between gap-4" onSubmit={handleSendMessage}>
                    <Icon size="md" variant="ghost" icon="bi bi-image" />
                    <Icon size="md" variant="ghost" icon="bi bi-emoji-smile" />
                    <TextInput rounded="full" block
                        className="flex-1 outline-none bg-gray-100  text-base text-black-80 px-6 py-3"
                        placeholder="Ecrire un message ...."
                        onChange={handleInputChange}
                        value={messInput}
                    />
                    <Icon onClick={handleSendMessage} icon="bi bi-arrow-up" size="sm" />
                </form>
            </div>
        </section>
    )
}


const Message = ({ message, sentDate, sentByCurrentUser = false }) => {

    const { timeSince } = useApp()

    return <div className="space-y-1 max-w-[420px] text-wrap break-words">
        <div className={`p-4  rounded-2xl space-y-3 w-full ${sentByCurrentUser ? 'bg-primary-20' : 'bg-black-10'}`}>
            <p className="text-small-2 text-black-80 ">{timeSince(sentDate, 3)}</p>
            <p className="text-small-1 text-black-100">{message}</p>
        </div>

        <div className={`flex items-center  w-full gap-2 ${sentByCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <Icon variant="ghost" icon="bi bi-trash" size="sm" />
            {
                !sentByCurrentUser &&
                <Icon variant="ghost" icon="bi bi-arrow-90deg-down" className="-rotate-90" size="sm" />
            }
        </div>
    </div>
}

export default Messages;

