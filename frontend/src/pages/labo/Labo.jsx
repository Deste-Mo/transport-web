import Button from "../../components/ui/Button.jsx";
import {useState} from "react";
import {motion} from "framer-motion";
import ConfirmPopup from "../../components/ui/ConfirmPopup.jsx";

const Labo = () => {
    const [isPopupVisible, setPopupVisible] = useState(true);
    const handleDelete = () => {
        setPopupVisible(true); // Show the popup
    };

    const handleConfirm = () => {
        // Handle confirmation action (e.g., delete item)
        console.log("Item deleted");
        setPopupVisible(false); // Hide the popup
    };

    const handleCancel = () => {
        setPopupVisible(false); // Hide the popup
    };
    const handleClick = () => {
    };

    return (
        <>
        <ConfirmPopup
            message="Do you want to delete this item?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            isVisible={isPopupVisible}/>
        </>
    )
};

export default Labo;
