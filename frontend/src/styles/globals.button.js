import {radiousVariant} from "./globals";

const globalButtonVariants = {
    constants: `
  overflow-hidden select-none text-base font-md items-center
  `,
    variant: {
        transparent: "text-white font-RobotoMd",
        primary: "bg-accent-l hover:opacity-80  text-black-100 font-medium  ",
        danger: "bg-danger-100/20 hover:bg-danger-60 text-text-l dark:text-text-d  ",
        secondary:
            "bg-accent-l/60 text-text-l dark:bg-accent-d/10 dark:text-accent-d font-medium  hover:text-primary-d hover:bg-accent-d ",   
        'secondary-2' : "bg-primary-d/10 text-text-l dark:bg-primary-l/10 dark:text-primary-l font-medium  hover:text-primary-d hover:bg-accent-d",
        // secondary: "bg-black-10 text-black-100 hover:bg-black-20 dark:hover:bg-white-80 dark:hover:text-black-100   font-RobotoMd dark:bg-white-60 dark:text-black-100 ",
        success: "bg-success hover:bg-success-60 text-white  ",
        outline:
            " text-[#C99122] dark:text-accent-d border-accent-d hover:text-text-l hover:bg-accent-d",
        ghost: "text-white hover:bg-black-10  dark:text-white-100 dark:hover:bg-white-10 hover:bg-accent-d hover:text-text-l",
        disabled: "bg-black-40 text-black-100 border-none cursor-not-allowed dark:text-white-40 dark:bg-white-40",
        "modern-1":
            "relative border border-2 border-[#000] text-black  shadow-dark-1 bg-white active:shadow-none   active:translate-y-[4px] active:translate-x-[4px]   font-RobotoMd ",
        "modern-2":
            "relative bg-[#000] text-white hover:translate-x-0 hover:translate-y-0  translate-y-[4px] translate-x-[4px] hover:shadow-white-1 active:translate-y-[4px] active:shadow-none active:translate-x-[4px]",
        "modern-3":
            "text-white bg-gradient-to-r from-primary from-10%  to-danger to-90% hover:translate-y-[-4px]",
        "modern-4":
            "bg-primary text-white shadow-dark-2 hover:translate-y-[-4px] active:bg-black active:text-primary",
    },
    size: {
        // md: "px-6 py-3 gap-3",
        // lg: "px-8 py-4 gap-4",
        // sm: ' px-4 py-2 gap-2',
        sm: "text-[14px] px-3 py-2 gap-2",
        md: "text-base px-6 py-2 gap-2",
        lg: "text-lg px-8 py-4 gap-4 font-bold",
    },
    textSize: {
        md: "text-base",
        lg: "text-base",
        sm: "text-small-1",
    },
    iconSize: {
        md: "",
        lg: "text-icon",
        sm: "",
    },
    radious: {...radiousVariant},
};


export default globalButtonVariants;