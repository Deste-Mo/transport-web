import {Button} from "../../styles/components.js";

const ConfirmPopup = ({className, message = "Question ?", onConfirm, onCancel}) => {
    return (
        <div className={`flex flex-col gap-4 max-w-max min-w-[240px] p-4 rounded-xl bg-white-100 dark:bg-white-0 dark:backdrop-blur-sm ${className}`}>
            <p className="text-black-100 dark:text-white-100 text-center">{message}</p>
            <div className="w-full border border-white-20 dark:border-white-10 "/>
            <div className="flex justify-between items-center gap-2">
                <Button size="sm" block onClick={onConfirm}>Oui</Button>
                <Button variant="secondary" size="sm" block onClick={onCancel}>Annuler</Button>
            </div>
        </div>
    )
}

export default ConfirmPopup;