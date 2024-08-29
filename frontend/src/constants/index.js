export const SERVERLINK = "http://localhost:3000";

// REGEXP
export const EMAIL_REGEX = /^[a-z0-9_.-]+@[a-z0-9._-]+\.[a-z]{2,}$/i;
export const PASSWORD_REGEX = /^[a-zA-Z0-9-_.#]{8,}$/;
export const NAME_REGEX = /^[a-z0-9.-_#]{4,}$/i;
export const LAST_NAME_REGEX = /^[a-z0-9.-_#\s]{4,}$/i;
export const CIN_REGEX = /^[0-9]{5}[2|1][0-9]{6}$/;
export const NIF_STAT_REGEX = /^[0-9]{5,}$/;
export const PHONE_REGEX = /^(\+261)?(032|033|034|037|038|020)[0-9]{7}$/;

export const EMAIL_REGEX_MESSAGE = "Veuillez saisir une adresse e-mail valide (exemple : exemple@domaine.com)";
export const PASSWORD_REGEX_MESSAGE = "Le mot de passe doit comporter au moins 8 caractères (lettres, chiffres, - , _ , . , #)";
export const LAST_NAME_REGEX_MESSAGE = "Le prénom doit comporter au moins 4 caractères (lettres, chiffres, - , _ , . , #)";
export const NAME_REGEX_MESSAGE = "Le nom doit comporter au moins 4 caractères (lettres, chiffres, - , _ , . , #, espaces)";
export const CIN_REGEX_MESSAGE = "Le CIN doit comporter 12 chiffres (exemple : 1234567123456)";
export const NIF_STAT_REGEX_MESSAGE = "Le NIF doit comporter au moins 5 chiffres";
export const PHONE_REGEX_MESSAGE = "Veuillez saisir un numéro de téléphone au format +261 (32|33|34|37|38|020)XXXXXXX ou 0(32|33|34|37|38|020)XXXXXXX, où X représente un chiffre";

// Registration pages constants
export const REGISRATION_STEPS = {
  accoutType: 1,
  identification: 2,
  security: 3,
};

export const ACCOUNT_TYPES = {
  camion: "Camionneur",
  society: "Entreprise",
  client: "Client",
};

export const TOAST_TYPE = {
  success: "success",
  error: "error",
};



export const OFFER_CARD_FILTERS = [
  {
    title: "Type de compte",
    values: [
      {
        name: "Tous",
        active: true,
      },
      {
        name: "Client",
        active: false,
      },
      {
        name: "Entreprise",
        active: false,
      },
      {
        name : "Camionneur",
        active: false,
      }
    ],
  },
  {
    title: "Date de publication",
    values: [
      {
        name: "Tous",
        active: true,
      },
      {
        name: "Aujourd'hui",
        active: false,
      },
      {
        name: "Récente",
        active: false,
      },
      {
        name: "Ancienne",
        active: false,
      },
    ],
  },
];
export const OFFER_CARD_FILTERS_PROFILE = [
  {
    title: "Date de publication",
    values: [
      {
        name: "Tous",
        active: true,
      },
      {
        name: "Aujourd'hui",
        active: false,
      },
      {
        name: "Récente",
        active: false,
      },
      {
        name: "Ancienne",
        active: false,
      },
    ],
  },
];

export const OFFER_CARD_FILTERS_MODE = {
  accountType: {
    all: "Tous",
    client: "Client",
    entreprise: "Entreprise",
    camionneur : "Camionneur",
  },
  postDate: {
    all: "Tous",
    today: "Aujourd'hui",
    recent: "Récente",
    old: "Ancienne",
  },
};



export const OFFER_CARD_FILTERS_TITLES = {
  accountType: "Type de compte",
  postDate: "Date de publication",
};

export const BREAKPOINTS = {
  mobile: "767",
};



export const USERS_FILTERS_DATAS = [
  {
    name: "Suivi(s)",
    active: true,
  },
  {
    name: "Suggestion(s)",
    active: false,
  },
];

export const USERS_FILTERS = {
  follower: "Suivi(s)",
  suggestion: "Suggestion(s)",
};
