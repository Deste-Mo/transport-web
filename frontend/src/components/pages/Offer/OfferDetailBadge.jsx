

const OfferDetailBadge = ({icon, text}) => {
    return (
        <div className=" text-small-2 rounded-full px-4 py-2 bg-primary-20 flex gap-2 cursor-pointer border border-primary-20 hover:bg-primary-80 group dark:hover:bg-primary-40 dark:text-white-100 dark:bg-primary-10">
            <i className={`${icon} text-primary-100 dark:group-hover:text-white-100 group-hover:text-black-100`}></i>
            <p>{text}</p>
        </div>
    )
}

export default  OfferDetailBadge;
