export const toastVariants =  {
    visible : {
        opacity : 1,
        x : 0,
    },
    hidden : {
        opacity: 0,
        x : "100%",
    }
}

export const appVariants = {
    visible : {
        opacity : 1,
        y : 0,
        transition : {
            duration : 0.2,
            ease : "easeOut"
        }
    },
    hidden : {
        opacity : 0,
        y : "-5%",
    },
    exit : {
        opacity : 0,
        y : "5%"
    }
}

export const profilePopupVariants = {
    visible : {
        opacity : 1,
        scale : 1,
        transition : {
            duration : 0.2,
            ease : "easeOut"
        } 
    },
     hidden : {
        scale : 0.8,
         opacity : 0,
     }
}