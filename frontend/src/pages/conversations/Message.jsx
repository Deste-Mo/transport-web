import {useNavigate} from "react-router-dom";
import {Button, TextArea, TextInput} from "../../styles/components";
import {useAuth} from "../../context/AuthProvider";
import {useApp} from "../../context/AppPorvider";
import {useEffect, useRef, useState} from "react";
import {useSocketContext} from "../../context/SocketContext";
import {SERVERLINK} from "../../constants";
import Mess from "../../components/pages/conversations/Message.jsx";
import Icon from "../../components/ui/Icon.jsx";
import {Input} from "postcss";

const Messages = () => {

    const navigate = useNavigate();

    const {token} = useAuth();

    const {messages, setMessages, userToChat, setUserToChat, handleCountUnread} = useApp()

    const [messInput, setMessInput] = useState("");

    const endOfMessagesRef = useRef(null);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    const handleClick = () => {
        localStorage.removeItem('userToChat');
        navigate('/discussion');
    }

    const handleInputChange = (e) => {
        setMessInput(e.target.value)
    }

    const {socket} = useSocketContext();


    useEffect(() => {

        const handleShown = async () => {

            const user = await JSON.parse(localStorage.getItem('userToChat'));

            setUserToChat({
                id: user.id,
                fullName: user.fullName,
                accountType: user.accountType,
                pic: user.pic
            })

            const messagesRes = await fetch(SERVERLINK + '/api/messages/' + await user.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            })

            const allMessages = await messagesRes.json();

            setMessages(await allMessages.messages);

            scrollToBottom();

        }

        handleShown();

        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
            handleCountUnread();
            handleShowConversation();
        });

        return () => socket?.off("newMessage");

    }, [messages, socket]);


    const handleSendMessage = async (e) => {
        e.preventDefault();

        const userToChat = await JSON.parse(localStorage.getItem('userToChat')).id;

        const response = await fetch(SERVERLINK + '/api/messages/send/' + userToChat, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify({message: messInput})
        });

        const answer = await response.json();

        console.log(answer);
        setMessInput("");
        scrollToBottom();
    }
    return (
        <section
            className="flex flex-col items-center justify-center w-full gap-4  rounded-xl bg-white-100 h-[85vh] relative overflow-hidden">
            <div
                className="flex items-center justify-between w-full py-4 px-6 border-0 border-b border-b-black-20  bg-white-100 top-0 z-40">
                <div className="flex items-center justify-between ">
                    <Icon variant="ghost" icon="bi bi-chevron-left " onClick={() => navigate("/discussion")}/>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <img src={userToChat.pic} className={"size-[54px] rounded-full bg-black-20"}/>
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
                                    message.receiverid === userToChat.id ? (
                                        <div className="w-full flex justify-start">
                                            <Message
                                                message={message.content}
                                                sentDate="2 minutes"/>
                                        </div>
                                    ) : (
                                        <div className="w-full flex justify-end">
                                            <Message
                                                message={message.content}
                                                sentDate={new Date(message.sentdate).toLocaleString()} sentByCurrentUser/>
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
                <div ref={endOfMessagesRef}/>
            </div>
            <div className="border-0 bg-white-100 px-6 py-4 w-full border-t border-t-black-20  bottom-0 z-40">
                <form className="flex items-center justify-between gap-4" onSubmit={handleSendMessage}>
                    <Icon size="md" variant="ghost" icon="bi bi-image"/>
                    <Icon size="md" variant="ghost" icon="bi bi-emoji-smile"/>
                    <TextInput rounded="full" block
                               className="flex-1 outline-none bg-gray-100  text-base text-black-80 px-6 py-3"
                               placeholder="Ecrire un message ...."
                               onChange={handleInputChange}
                               value={messInput}
                    />
                    <Icon onClick={handleSendMessage} icon="bi bi-arrow-up" size="sm"/>
                </form>
            </div>
        </section>
    )
}


const Message = ({message, sentDate, sentByCurrentUser = false}) => {
    return <div className={`space-y-1 max-w-1/2`}>
        <div className={`p-4  rounded-2xl space-y-3 w-full ${sentByCurrentUser ? 'bg-primary-20' : 'bg-black-10'}`}>
            <p className="text-small-2 text-black-80 ">{sentDate}</p>
            <p className="text-small-1 text-black-100">{message}</p>
        </div>

        <div className={`flex items-center  w-full gap-2 ${sentByCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <Icon variant="ghost" icon="bi bi-trash" size="sm"/>
            {
                !sentByCurrentUser &&
                <Icon variant="ghost" icon="bi bi-arrow-90deg-down" className="-rotate-90" size="sm"/>
            }
        </div>
    </div>
}

export default Messages;

/*
import { useNavigate } from "react-router-dom";
import { TextArea } from "../../styles/components";
import { useAuth } from "../../context/AuthProvider";
import { useApp } from "../../context/AppPorvider";
import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { SERVERLINK } from "../../constants";
import Mess from "../../components/pages/conversations/Message.jsx";

const Messages = () => {

    const navigate = useNavigate();

    const { token } = useAuth();

    const { messages, setMessages, userToChat, setUserToChat, handleCountUnread } = useApp()

    const [messInput, setMessInput] = useState("");

    const endOfMessagesRef = useRef(null);

    const scrollToBottom = () => {
        // endOfMessagesRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    const handleClick = () => {
        localStorage.removeItem('userToChat');
        navigate('/discussion');
    }

    const handleInputChange = (e) => {
        setMessInput(e.target.value)
    }

    const { socket } = useSocketContext();


    useEffect(() => {

        const handleShown = async () => {

            const user = await JSON.parse(localStorage.getItem('userToChat'));

            console.log(user);

            setUserToChat({
                id: user.id,
                fullName: user.fullName,
                accountType: user.accountType,
                pic: user.pic
            })

            const messagesRes = await fetch(SERVERLINK + '/api/messages/' + await user.id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            })

            const allMessages = await messagesRes.json();

            setMessages(await allMessages.messages);

            scrollToBottom();

        }

        handleShown();

        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
            handleCountUnread();
            // handleShowConversation();
        });

        return () => socket?.off("newMessage");
        
    }, [messages, socket]);



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
        
        setMessInput("");
        scrollToBottom();
    }
    return (
        <section className="flex flex-col items-center justify-center w-full gap-4">
                <div className="w-full h-fit bg-white-100 flex justify-start p-2 rounded-2xl mt-5">
                    <div className="flex items-center">
                        <button className=" text-lead px-3 cursor-pointer" onClick={e => handleClick(e)}>&lt;</button>
                        <img src={userToChat.pic} alt="" className="bg-black-20 w-[40px] h-[40px] rounded-full" />
                        <div className="ml-3">
                            <span className="text-small-2 text-center text-black-80">{userToChat.fullName}</span>
                            <span className="block text-small-3 bg-primary-80 w-fit rounded-xl text-center text-black-60 px-3 mb-2">{userToChat.accounttype}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[500px] overflow-auto bg-black-10 relative mt-3 rounded-lg ">
                    <div className="flex flex-col mt-3 p-3">
                        {messages.length > 0 ? messages.map(message => (
                            <Mess key={message.messageid} message={message} idOther={userToChat.id} />
                        )
                        ) :
                            <p className="text-black-40 w-[100%] h-[100%] text-center">
                                Envoyé un message!
                            </p>
                        }
                        <div ref={endOfMessagesRef} />
                        <form className=" mt-3 w-[97%] flex items-center sticky bottom-0 self-center justify-end" onSubmit={handleSendMessage}>
                            <button className="absolute top-[20%] right-3 text-black-80 p-2 text-center">
                                <i className="bi bi-send"></i>
                            </button>
                            <TextArea className="h-[70px] mt-3 bg-white-100 rounded-sm" block
                                placeholder="Messages" onChange={handleInputChange} value={messInput}></TextArea>
                        </form>
                    </div>
                </div>
        </section>
    )
}


export default Messages;*/
