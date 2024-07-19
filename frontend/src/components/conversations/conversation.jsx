import { useNavigate } from "react-router-dom"

const Conv = () => {

    const navigate = useNavigate()

    const handleClick = () => {
       navigate('/messages')
    }

    return (
        <div className="bg-primary-40 flex justify-between items-center p-3 rounded-lg mb-3 cursor-pointer" onClick={e => handleClick(e)} >
            <div className="flex justify-center items-center" >
                <div className="mr-5">
                    <img src="" alt="" className="rounded-full w-[40px] h-[40px]" />
                </div>
                <div>
                    <span className="block text-small-2 text-black-60">Ralaivoavy Natanael</span>
                    <span className="block text-small-3 bg-primary-80 w-fit rounded-xl text-center text-black-60 px-3 mb-2">Client</span>
                    <span className="block text-small-3 text-black-80">Lorem ipsum</span>
                </div>
            </div>
            <div>                
                <span className="text-small-3"><i className="bi bi-circle mr-3"></i>Il y a 10 minutes</span>
            </div>
        </div>
    )
}

export default Conv;