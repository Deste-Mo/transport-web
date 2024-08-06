const globalCheckboxVariants = {
    constant: `
  cursor-pointer
  peer relative appearance-none shrink-0  border-1   
  focus:outline-none focus:ring-offset-0 focus:ring-1 
  disabled:bg-white-40
  disabled:border-white-40
  `,

    variant: {
        primary: `
    bg-white
    checked:border-0
    checked:bg-primary
    focus:ring-primary
    border-primary
    `,

        outline: `
    border
    border-white
    checked:border-0
    
    `,
    },

    size: {
        sm: "",
        md: "w-4 h-4 mt-1 ",
        lg: "",
    },

    radious: {
        default: "rounded-sm",
    },
};

export default globalCheckboxVariants;