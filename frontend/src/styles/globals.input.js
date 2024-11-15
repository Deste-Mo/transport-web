import {radiousVariant} from "./globals";

export const globalInputVariants = {
    constant : `
    text-base outline-none
    flex  justify-between resize-none
    `
    ,
    variant : {
        outline : "border border-black-60 placeholder:text-black-60 text-black-60 dark:placeholder:text-white-60 focus:ring-2 hover:ring-2  bg-white dark:border-white-40  dark:text-white-60 dark:bg-[#000] ",
        fill : "text-black-80  border-black-10 bg-[#e6e7ea] dark:bg-white-1  placeholder:text-black-60 outline-none focus:ring-primary-100 focus:ring-2  dark:placeholder:text-white-60  dark:text-white-80 dark:border-white-60 ",
        default : "outline",
    },
    width : "w-full md:max-w-[380px]",
    //md:w-[380px]
    size : {
        sm : "px-6 py-2",
        md: "px-6 py-3 ",
        lg: "px-8 py-4",
        default : "md",
    },
    rounded : {...radiousVariant},
}