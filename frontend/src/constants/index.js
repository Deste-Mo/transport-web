export const SERVERLINK = 'http://localhost:3000';


// REGEXP
export const EMAIL_REGEX = /^[a-z0-9_.-]+@[a-z0-9._-]+\.[a-z]{2,}$/i;
export const PASSWORD_REGEX = /^[a-zA-Z0-9-_.#]{8,}$/;
export const NAME_REGEX = /^[a-z0-9.-_#]{4,}$/i;
export const LAST_NAME_REGEX = /^[a-z0-9.-_#\s]{4,}$/i;
export const CIN_REGEX = /^[0-9]{5}[2|1][0-9]{6}$/;
export const NIF_STAT_REGEX = /^[0-9]{5,}$/
export const PHONE_REGEX = /^(\+261)?(032|033|034|037|038|020)[0-9]{7}$/;

// Registration pages constants
export const REGISRATION_STEPS = {
    accoutType: 1,
    identification: 2,
    security: 3,
}

export const ACCOUNT_TYPES = {
    camion : "Camionneur",
    society : "Entreprise",
    client : "Client",
}

export const TOAST_TYPE = {
    success : "success",
    error : "error",
}