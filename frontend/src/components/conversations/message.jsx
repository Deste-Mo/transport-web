const Mess = ({message, idOther}) => {
    return (
        <div className={`flex break-words flex-col mb-3 ${message.receiverid === idOther ? 'mine' : 'else'}`} >
            <span className="text-small-3 text-black-40 text-center">{new Date(message.sentdate).toLocaleString()}</span>
            <span className={`text-small-2 font-sans max-w-40 w-fit h-max block py-2 px-5 text-wrap rounded-lg ${message.receiverid === idOther ? 'bg-primary-80 text-white-100' : 'bg-white-80 text-black-80'}`}>{message.content}</span>
        </div>
    )
}

export default Mess;