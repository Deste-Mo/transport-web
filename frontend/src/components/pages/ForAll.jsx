import PropTypes from "prop-types";
import Button from "../ui/Button";
import { useEffect } from "react";
import { useApp } from "../../context/AppPorvider";

const sizeVariants = {
    "md": "px-4 py-3",
    "lg": "p-4",
}


export function ForAll({ key, name, icon, disableButton = false, sticky = false, size = "md", profile = false, className }) {

    const { countFollow, handleCountFollow } = useApp()


    useEffect(() => {
        handleCountFollow()
    }, [countFollow, handleCountFollow]);


    return (
        <div key={key} className={`flex w-full justify-between items-center z-40  rounded-md  bg-white-100 sticky top-0  ${sticky && "sticky"} ${sizeVariants[size]}`}>
            <div className="flex items-center gap-4">
                <i className={icon + " text-icon"}></i>
                <span>{name}</span>
            </div>
            {profile ? <span className="bg-primary-40 p-2 rounded-lg">{countFollow}</span> : null}
            {disableButton ? <Button >Tout Effacer</Button> : null}
        </div>
    )
}

ForAll.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}