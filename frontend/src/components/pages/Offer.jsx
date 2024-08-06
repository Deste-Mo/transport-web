import Button from "../ui/Button";
import SavePublication from "./SavePublication";

export const Offer = ({className, fullName, accountType, postedTime, title, price}) => {
    return (
        <div className={`"flex flex-col gap-4 px-4 py-8 bg-white-100 rounded-lg ${className}`}>
            <div className="flex flex-col gap-2 ">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img src="" alt="" className="w-16 h-16 rounded-full bg-primary-100"/>
                        <div className="flex flex-col gap-2">
                            <span>{fullName}</span>
                            <span>{accountType}</span>
                            <span><i className="bi bi-clock"></i>{postedTime}</span>
                        </div>
                    </div>
                    <i className="bi bi-three-dots-vertical"></i>
                </div>
                <span>{title}</span>
            </div>
            <SavePublication disable etat="dispo" name="cammion" price="3000Ar" lieu="Fianarantsoa" icon/>
            <Button block icon="bi bi-chat-dots">Contacter</Button>
        </div>
    )
}