import { TextInput } from "../../styles/components";
import {useNavigate} from 'react-router-dom'
import Conv from "../../components/conversations/conversation";
import { useState, useEffect } from "react";

const Conversation = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/messages');
    }

    return (
        <section className="w-[100vw] h-[100vh] flex items-center justify-center scroll-smooth">
            <div className="bg-black-20 p-4 w-[50vw] h-[90vh] flex flex-wrap justify-center overflow-auto relative rounded-2xl">
                <div className="w-[600px] bg-white-100 h-max p-3 mt-2 rounded-lg opacity-80 sticky top-0">
                    <i className="bi bi-chat mr-2"></i><span className="text-small-1 mr-2">Discussions</span><span className="text-small-1 mr-2">&gt;</span><span className="text-small-1 mr-2 text-primary-80">Conversations</span>
                </div>

                <div className="w-[600px] h-fit bg-white-100 flex justify-around p-5 rounded-2xl mt-5">
                    <div className="cursor-pointer" onClick={e => handleClick(e)}>
                        <img src="" alt="" className="bg-black-20 w-[40px] h-[40px] rounded-full" />
                        <span className="text-small-2 text-center text-black-80">Emmanuel</span>
                    </div>
                    <div className="cursor-pointer" onClick={e => handleClick(e)}>
                        <img src="" alt="" className="bg-black-20 w-[40px] h-[40px] rounded-full" />
                        <span className="text-small-2 text-center text-black-80">Toslin</span>
                    </div>
                    <div className="cursor-pointer" onClick={e => handleClick(e)}>
                        <img src="" alt="" className="bg-black-20 w-[40px] h-[40px] rounded-full" />
                        <span className="text-small-2 text-center text-black-80">Nathan</span>
                    </div>
                </div>

                <div className="mt-3 w-[600px] flex items-center relative">
                    <i className="bi bi-search absolute top-[45%] left-3 text-black-80"></i>
                    <TextInput className=" p-5 h-[40px] mt-3 bg-white-100 rounded-sm" block placeholder="Recherche une personne"></TextInput>
                </div>

                <div className="w-[600px] h-[70%] bg-white-100 p-5 overflow-auto mt-3 rounded-lg">
                    <Conv />
                </div>
            </div>
        </section>
    )
}


export default Conversation;