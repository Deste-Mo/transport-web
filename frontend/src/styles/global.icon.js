import { radiousVariant } from "./globals";
import globalButtonVariants from "./globals.button";

const globalIconVariants = {
    constant: `flex items-center justify-center rounded-full `,
    variant : {...globalButtonVariants.variant},
    size : {
        md: "size-10 p-2",
        lg: "size-12 p-2",
    },
    raidous : {...radiousVariant}
};

export default globalIconVariants;