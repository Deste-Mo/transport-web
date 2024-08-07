import {createContext, useContext, useState} from "react";
import {SERVERLINK} from "../constants/index.js";
import axios from "axios";
import {useAuth} from "./AuthProvider.jsx";

const OfferContext = createContext({});

const OfferProvider = ({children}) => {
    const {token} = useAuth()

    const [offers, setOffers] = useState([]);
    const [currentUserOffers, setCurrentUserOffers] = useState([]);
    const [suggestedOffers, setSuggestedOffers] = useState([]);
    const [savedOffers, setSavedOffers] = useState(0);

    const getOffers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/offres/gethomepageOffers`, {
            headers: {
                token
            }
        });
        setOffers(await response?.data?.offers);
    }
    
    const getCurrentUserOffers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/offres/allofferforuser`, {
            headers: { token}
        });
        setCurrentUserOffers(await response?.data?.all);
    }
    const getSavedOffers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/offres/savedoffers`, {
            headers: {
                token
            }
        });
        setSavedOffers(await response?.data?.saved);
    }
    const getSuggestedOffers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/offres/suggestionoffers`, {
            headers: {token: token}
        })
        setSuggestedOffers(await response?.data?.suggestions);
    }
    
    return (
        <OfferContext.Provider value={{
            offers,
            suggestedOffers,
            currentUserOffers,
            savedOffers,
            getOffers,
            getSavedOffers,
            getSuggestedOffers,
            getCurrentUserOffers,
        }}>
            {children}
        </OfferContext.Provider>
    )
}

export default OfferProvider;

export const useOffer = () => useContext(OfferContext);