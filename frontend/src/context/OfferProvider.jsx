import {createContext, useContext, useState} from "react";
import {OFFER_CARD_FILTERS_MODE, OFFER_CARD_FILTERS_TITLES, SERVERLINK} from "../constants/index.js";
import axios from "axios";
import {useAuth} from "./AuthProvider.jsx";

const OfferContext = createContext({});

const OfferProvider = ({children}) => {
    const {token} = useAuth();

    const [offers, setOffers] = useState([]);
    const [offerLoading, setOfferLoading] = useState(false);
    const [currentUserOffers, setCurrentUserOffers] = useState([]);
    const [suggestedOffers, setSuggestedOffers] = useState([]);
    const [savedOffers, setSavedOffers] = useState(0);
    const [updateOffer, setUpdateOffer] = useState({});
    const [pubNumber, setPubNumber] = useState(0);
    const [savedPubNumber, setSavedPubNumber] = useState(0);

    const getOffers = async () => {
        const response = await axios.get(
            `${SERVERLINK}/api/offres/gethomepageOffers`,
            {
                headers: {
                    token,
                },
            }
        );
        setOffers(await response?.data?.offers);
    };
    const getCurrentUserOffers = async (userId, offerId = null) => {
        const response = await axios.get(
            `${SERVERLINK}/api/offres/allofferforuser/${!userId ? "" : userId}${ offerId ? "/"+ offerId: ""}`,
            {
                headers: {token},
            }
        );
        setPubNumber(await response?.data?.all.length);
        setCurrentUserOffers(await response?.data?.all);
        setPubNumber(await response?.data?.all.length)
    }
    const getSavedOffers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/offres/savedoffers`, {
            headers: {
                token,
            },
        });
        setSavedPubNumber(await response?.data?.saved.length);
        setSavedOffers(await response?.data?.saved);
    };
    const getSuggestedOffers = async () => {
        const response = await axios.get(
            `${SERVERLINK}/api/offres/suggestionoffers`,
            {
                headers: {token: token},
            }
        );
        setSuggestedOffers(await response?.data?.suggestions);
    }
    const setUnavalaibleOffer = async (offerId) => {

        const response = await fetch(SERVERLINK + '/api/offres/setunavailableoffer/' + await offerId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        await response.json();
    }
    const setAvalaibleOffer = async (offerId) => {

        const response = await fetch(SERVERLINK + '/api/offres/setavailableoffer/' + await offerId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        await response.json();
    }
    const deleteOffer = async (offerId) => {

        const response = await fetch(SERVERLINK + '/api/offres/deleteofferforuser/' + await offerId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        await response.json();
    }
    const saveOffer = async (offerId) => {

        const response = await fetch(SERVERLINK + '/api/offres/saveoffer/' + await offerId, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
            }
        );

        await response.json();
    };
    const retireOffer = async (offerId) => {
        const response = await fetch(
            SERVERLINK + "/api/offres/retireoffer/" + (await offerId),
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },
            }
        );

        await response.json();
    };
    const getOfferById = async (offerId) => {
        // console.log("My token: " + token)

        const response = await axios.get(SERVERLINK + '/api/offres/offreToUp/' + offerId, {
            headers: {token: token}
        });
        setUpdateOffer(await response?.data?.offer);
        localStorage.removeItem("offerNotifId");
    }
    const filterOffers = (search, suggestedOffers) => {
        const filterModes = JSON?.parse(localStorage.getItem("offerCardFilter"));
        let filteredResult = suggestedOffers;

        const filterByAccountType = (accountTypeFilter) => {
            const accountTypeFilterMode = OFFER_CARD_FILTERS_MODE.accountType;
            switch (accountTypeFilter.activeFilter) {
                case accountTypeFilterMode.client: {
                    filteredResult = filteredResult.filter(
                        ({ accounttype }) =>
                            accounttype?.toLowerCase() ===
                            accountTypeFilterMode.client?.toLowerCase()
                    );
                    break;
                }
                case accountTypeFilterMode.entreprise: {
                    filteredResult = filteredResult.filter(
                        ({ accounttype }) =>
                            accounttype.toLowerCase() ===
                            accountTypeFilterMode.entreprise?.toLowerCase()
                    );
                    break;
                }
                case accountTypeFilterMode.camionneur : {
                    filteredResult = filteredResult.filter(
                        ({accounttype}) =>
                        accounttype?.toLowerCase() ===
                        accountTypeFilterMode.camionneur?.toLowerCase()
                    );
                    break;
                }
                default:
                    filteredResult = suggestedOffers;
                    break;
            }
        };
        const filterByPostDate = (postDateFilter) => {
            const postDateFilterMode = OFFER_CARD_FILTERS_MODE.postDate;

            switch (postDateFilter.activeFilter) {
                case postDateFilterMode.today: {
                    filteredResult = filteredResult.length > 0 && filteredResult.filter(({ publicationdate }) => {
                        const postDate = new Date(publicationdate);
                        const today = new Date();
                        return (
                            postDate.getFullYear() === today.getFullYear() &&
                            postDate.getMonth() === today.getMonth() &&
                            postDate.getDate() === today.getDate()
                        );
                    });
                    break;
                }
                case postDateFilterMode.recent: {
                    filteredResult = filteredResult.length > 0 && filteredResult.sort((a, b) => {
                        return new Date(b.publicationdate).getTime() - new Date(a.publicationdate).getTime();
                    });
                    break;
                }
                case postDateFilterMode.old: {
                    filteredResult = filteredResult.length > 0 && filteredResult.sort((a, b) => {
                        return new Date(a.publicationdate).getTime() - new Date(b.publicationdate).getTime();
                    });
                    break;
                }
                default: {
                    filteredResult = filteredResult.length > 0 && filteredResult.sort((a, b) => {
                        return new Date(b.publicationdate).getTime() - new Date(a.publicationdate).getTime();
                    });
                    break;
                }
            }
        };

        if (filterModes) {
            for (const filterMode of filterModes) {
                if (filterMode.title === OFFER_CARD_FILTERS_TITLES.accountType)
                    filterByAccountType(filterMode);
                if (filterMode.title === OFFER_CARD_FILTERS_TITLES.postDate)
                    filterByPostDate(filterMode);
            }
        }

        filteredResult = filteredResult.length > 0 && filteredResult.filter(
            ({ accounttype, capacity, firstname, lastname, title, description, depart }) => {
                if (!search) return true;
                
                return (
                    accounttype?.toLowerCase()?.includes(search?.toLowerCase()) ||
                    capacity?.toLowerCase()?.includes(search?.toLowerCase()) ||
                    firstname?.toLowerCase()?.includes(search?.toLowerCase()) ||
                    lastname?.toLowerCase()?.includes(search?.toLowerCase()) ||
                    title?.toLowerCase()?.includes(search?.toLowerCase()) ||
                    description?.toLowerCase()?.includes(search?.toLowerCase())||
                    depart?.toLowerCase()?.includes(search?.toLowerCase())
                );
            }
        );
        return filteredResult;
    };
    
    return (
        <OfferContext.Provider
            value={{
                filterOffers,
                offerLoading,
                offers,
                suggestedOffers,
                currentUserOffers,
                savedOffers,
                getOffers,
                getSavedOffers,
                getSuggestedOffers,
                getCurrentUserOffers,
                getOfferById,
                saveOffer,
                retireOffer,
                updateOffer,
                setUpdateOffer,
                pubNumber,
                savedPubNumber,
                setSavedPubNumber,
                setUnavalaibleOffer,
                setAvalaibleOffer,
                deleteOffer
            }}>
            {children}
        </OfferContext.Provider>
    );
};

export default OfferProvider;

export const useOffer = () => useContext(OfferContext);
