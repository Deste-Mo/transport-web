import PropTypes from "prop-types";
import Button from "../ui/Button";
import {useEffect} from "react";
import {useApp} from "../../context/AppPorvider";
import SearchBar from "../ui/SearchBar.jsx";
import Icon from "../ui/Icon.jsx";

const sizeVariants = {
    padding: {
        "md": "px-6 py-3",
        "lg": "px-6 py-4",
    },
    text: {
        "md": "text-lead text-black-80",
        "lg": "text-subtitle-3",
    }
}

export function SubHeader({
                              key,
                              name,
                              icon,
                              disableButton = false,
                              sticky = false,
                              size = "md",
                              profile = false,
                                rightContent,
                              className
                          }) {
    const {countFollow, handleCountFollow} = useApp()

    useEffect(() => {
        handleCountFollow()
    }, [countFollow, handleCountFollow]);


    return (
        <div key={key}
             className={`flex select-none w-full justify-between items-center z-30  rounded-xl shadow-sm border border-black-0 bg-white-100 sticky top-0  ${sticky && "sticky"} ${sizeVariants.padding[size]}`}>
            <div className={`flex items-center gap-4 ${sizeVariants.text[size]}`}>
                <i className={icon + " text-icon"}></i>
                <span>{name}</span>
            </div>
            {profile ? <span className="text-black-80">{countFollow}</span> : null}
            {rightContent}
        </div>
    )
}

SubHeader.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}