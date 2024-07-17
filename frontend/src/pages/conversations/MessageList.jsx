import { TextInput } from "../../styles/components";
import { useNavigate } from 'react-router-dom'
import Conv from "../../components/conversations/conversation";
import { useState, useEffect } from "react";
import { SERVERLINK } from "../../constants";
import { useAuth } from "../../context/AuthProvider";
import { useApp } from "../../context/AppPorvider";
import UserConv from "../../components/conversations/users";
import { useSocketContext } from "../../context/SocketContext";


const MessageList = () => {

    const { token, loading } = useAuth();

    const { conversations, handleShowConversation, friends, handleFriends } = useApp();

    const { socket } = useSocketContext();

    const { messages, setMessages } = useApp();

    useEffect(() => {

        handleFriends();
        handleShowConversation();

        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
            handleShowConversation();
        });

        return () => socket?.off("newMessage")

    }, [socket, token, setMessages])

    return (
        <section className="flex flex-col items-center justify-center w-full gap-6">
            <div
                className="bg-black-20 p-4 w-[50vw] h-[90vh] flex flex-wrap justify-center overflow-auto relative rounded-2xl">
                <div className="w-[600px] bg-white-100 h-max p-3 mt-2 rounded-lg opacity-80 sticky top-0">
                    <i className="bi bi-chat mr-2"></i><span className="text-small-1 mr-2">Discussions</span><span
                        className="text-small-1 mr-2">&gt;</span><span
                            className="text-small-1 mr-2 text-primary-80">Conversations</span>
                </div>

                <div className="w-[600px] h-fit bg-white-100 flex justify-start overflow-auto p-5 rounded-2xl mt-5">
                    {friends.length > 0 ?
                    friends.map(friend => (
                        <UserConv key={friend.userid} friend={friend} />
                    )):
                    <div>
                        No friends
                    </div>
                }
                </div>

                <div className="mt-3 w-[600px] flex items-center relative">
                    <i className="bi bi-search absolute top-[45%] left-3 text-black-80"></i>
                    <TextInput className=" p-5 h-[40px] mt-3 bg-white-100 rounded-sm" block
                        placeholder="Recherche une personne"></TextInput>
                </div>

                <div className="w-[600px] h-[70%] bg-white-100 p-5 overflow-auto mt-3 rounded-lg">
                    {conversations.length > 0 ?
                        conversations.map(conversation => (
                            <Conv key={conversation.userid} id={conversation.userid} userToChat={conversation} />
                        )
                        )
                        :
                        <p className="text-black-40 w-[100%] h-[100%] text-center">
                            Commencer une conversation !
                        </p>
                    }
                </div>
            </div>
        </section>
    )
}


export default MessageList;