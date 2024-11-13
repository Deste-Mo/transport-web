import {Button} from "../../styles/components.js";
import {motion} from "framer-motion";

const ConfirmPopup = ({className = "", message = "Question ?", onConfirm, onCancel}) => {
    return  (
        <motion.div
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.8}}
            className={`flex flex-col gap-4 max-w-max min-w-[240px] p-6  rounded-xl bg-white-100 dark:bg-white-0 dark:backdrop-blur-sm ${className}`}>
            <p className="text-black-100 dark:text-white-100 text-center">{message}</p>
            <div className="w-full border border-white-20 dark:border-white-10 "/>
            <div className="flex justify-between items-center gap-2">
                <Button size="sm" block onClick={onConfirm}>Oui</Button>
                <Button variant="secondary-2" size="sm" block onClick={onCancel}>Annuler</Button>
            </div>
        </motion.div>
    )
}

export default ConfirmPopup;