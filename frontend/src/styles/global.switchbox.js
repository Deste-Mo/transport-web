const globalSwitchboxVariants = {
    constants: `
      border
      relative  
      peer peer-checked:after:translate-x-full 
      rtl:peer-checked:after:-translate-x-full 
      after:content-[''] 
      after:border 
      after:absolute after:top-[1px] 
      after:start-[2px] 
    after:transition-all  
       
    `,
    variant: {
        primary: `
    peer-checked:after:border-white
    after:bg-white 
    after:border-white 
    peer-checked:bg-primary
    bg-white-40  
        `,
        outline: `
    border-white
    peer-checked:after:bg-white
    after:border-white
    
    `,
    },
    size: {
        sm: "",
        md: "w-12 h-6 after:size-[20px]",
        lg: "",
    },

    radious: {
        default: "rounded-full after:rounded-full",
    },
};


export default globalSwitchboxVariants;