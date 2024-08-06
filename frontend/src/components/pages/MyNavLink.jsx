import { useNavigate } from "react-router-dom";

const MyNavLink = ({ icon, name, number, path, active = false }) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(path)
    }


    return (
        <li onClick={handleNavigate}
            className={`flex flex-col justify-center items-center cursor-pointer relative hover:text-primary-100 ${active ? "text-primary-100" : "text-black-100"} `}>
            <i className={`${icon} text-icon`}></i>
            <span className="text-base">{name}</span>
            {
                number > 0 ?
                    <span className="absolute top-0 right-3 w-5 h-5 bg-danger-100 rounded-[50%] text-black-100 flex items-center justify-center">{number}</span>
                    :
                    null
            }
        </li>
    )
}

export default MyNavLink;