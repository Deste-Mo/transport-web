import { radiousVariant } from "./globals";
import globalButtonVariants from "./globals.button";

const globalIconVariants = {
    constant: `flex items-center justify-center rounded-full gap-2`,
    variant : {...globalButtonVariants.variant},
    size : {
        sm : "size-[32px] px-3 ",
        md: "size-10 p-2",
        lg: "size-12 p-2",
       
    },
    iconSize : {
        sm : "text-small-1",
        md : "text-base",
        lg : "text-icon"
    },
    raidous : {...radiousVariant}
};



export default globalIconVariants;