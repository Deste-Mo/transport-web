import { radiousVariant } from "./globals";

const globalButtonVariants = {
    constants: `
  overflow-hidden select-none text-base font-RobotoMd items-center
  `,
    variant: {
        transparent: "text-white font-RobotoMd",
        primary: "bg-primary-100 hover:bg-primary-40 text-white  font-RobotoMd",
        danger: "bg-danger hover:bg-danger-60 text-white  font-RobotoMd",
        secondary:
            "bg-black-10 text-primary hover:bg-primary hover:text-white  font-RobotoMd",
        success: "bg-success hover:bg-success-60 text-white  font-RobotoMd",
        outline:
            " border-1 border text-black dark:text-white font-RobotoMd hover:bg-white hover:text-black",
        ghost: "text-white hover:bg-white hover:text-black",
        disabled: "bg-white-40 text-white-40 border-none cursor-not-allowed",
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
        md: "px-6 py-3 gap-3",
        lg: "px-8 py-4 gap-4",
    },

    radious: { ...radiousVariant },
};


export default globalButtonVariants;