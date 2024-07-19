import { useNavigate } from "react-router-dom";
import { TextArea, TextInput } from "../../styles/components";

const Messages = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/conversations');
    }

    return (
        <section className="w-[100vw] h-[100vh] flex items-center justify-center scroll-smooth">
            <div className="bg-black-10 w-[50vw] p-5 h-[90vh] flex flex-wrap justify-center overflow-auto relative rounded-2xl">
                <div className="w-[600px] bg-white-100 h-max p-3 mt-2 rounded-lg opacity-80 sticky top-0">
                    <i className="bi bi-chat mr-2"></i><span className="text-small-1 mr-2 cursor-pointer" onClick={e => handleClick(e)}>Conversations</span><span className="text-small-1 mr-2">&gt;</span><span className="text-small-1 mr-2 text-primary-80">Listes Message</span>
                </div>

                <div className="w-[600px] h-fit bg-white-100 flex justify-start p-2 rounded-2xl mt-5">
                    <div className="flex items-center">
                        <button className="mr-3 text-lead px-3 cursor-pointer" onClick={e => handleClick(e)}>&lt;</button>
                        <img src="" alt="" className="bg-black-20 w-[40px] h-[40px] rounded-full" />
                        <div className="ml-3">
                            <span className="text-small-2 text-center text-black-80">Emmanuel</span>
                            <span className="block text-small-3 bg-primary-80 w-fit rounded-xl text-center text-black-60 px-3 mb-2">Client</span>
                        </div>
                    </div>
                </div>

                <div className="w-[600px] h-[500px] overflow-auto bg-black-10 relative mt-3 rounded-lg ">
                    <div className="flex flex-col mt-3 p-3">
                        <div className="mine">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>

                        <div className="else">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>

                        <div className="else">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>
                        <div className="else">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>

                        <div className="mine">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>                    <div className="mine">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>
                        <div className="else">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>
                        <div className="else">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>

                        <div className="mine">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>                    <div className="mine">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>
                        <div className="else">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>
                        <div className="else">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>

                        <div className="mine">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>                    <div className="mine">
                            <span className="text-small-3 text-black-40">09 : 20</span>
                            <p className="text-small-2 font-sans bg-white-100 w-max py-2 px-5 rounded-lg">Bonjour</p>
                        </div>

                        <form className=" mt-3 w-[97%] flex items-center sticky bottom-0 self-center justify-end">
                            <button className="absolute top-[20%] right-3 text-black-80 p-2 text-center">
                                <i className="bi bi-send"></i>
                            </button>
                            <TextArea className="h-[70px] mt-3 bg-white-100 rounded-sm" block placeholder="Messages"></TextArea>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Messages;