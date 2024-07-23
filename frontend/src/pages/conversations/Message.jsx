import { useNavigate } from "react-router-dom";
import { TextArea } from "../../styles/components";
import Mess from "../../components/conversations/message";
import { useAuth } from "../../context/AuthProvider";
import { useApp } from "../../context/AppPorvider";
import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { SERVERLINK } from "../../constants";

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

        console.log(answer);
        setMessInput("");
        scrollToBottom();
    }
    return (
        <section className="flex flex-col items-center justify-center w-full gap-6">
            <div
                className="bg-black-10 w-[50vw] p-5 h-[90vh] flex flex-wrap justify-center overflow-auto relative rounded-2xl">
                <div className="w-[600px] bg-white-100 h-max p-3 mt-2 rounded-lg opacity-80 sticky top-0">
                    <i className="bi bi-chat mr-2"></i><span className="text-small-1 mr-2 cursor-pointer"
                        onClick={e => handleClick(e)}>Conversations</span><span
                            className="text-small-1 mr-2">&gt;</span><span className="text-small-1 mr-2 text-primary-80">Listes Message</span>
                </div>

                <div className="w-[600px] h-fit bg-white-100 flex justify-start p-2 rounded-2xl mt-5">
                    <div className="flex items-center">
                        <button className="mr-3 text-lead px-3 cursor-pointer" onClick={e => handleClick(e)}>&lt;</button>
                        <img src={userToChat.pic} alt="" className="bg-black-20 w-[40px] h-[40px] rounded-full" />
                        <div className="ml-3">
                            <span className="text-small-2 text-center text-black-80">{userToChat.fullName}</span>
                            <span className="block text-small-3 bg-primary-80 w-fit rounded-xl text-center text-black-60 px-3 mb-2">{userToChat.accounttype}</span>
                        </div>
                    </div>
                </div>

                <div className="w-[600px] h-[500px] overflow-auto bg-black-10 relative mt-3 rounded-lg ">
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
            </div>
        </section>
    )
}


export default Messages;