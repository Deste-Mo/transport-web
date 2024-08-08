import { createContext, useContext, useState } from "react";
import { SERVERLINK } from "../constants/index.js";
import axios from "axios";
import {useAuth} from "./AuthProvider.jsx";

const OfferContext = createContext({});

const OfferProvider = ({children}) => {
    const {token} = useAuth()

    const [offers, setOffers] = useState([]);
    const [currentUserOffers, setCurrentUserOffers] = useState([]);
    const [suggestedOffers, setSuggestedOffers] = useState([]);
    const [savedOffers, setSavedOffers] = useState(0);
    const [updateOffer, setUpdateOffer] = useState({});
    const [pubNumber, setPubNumber] = useState(0);
    const [savedPubNumber, setSavedPubNumber] = useState(0);

    const getOffers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/offres/gethomepageOffers`, {
            headers: {
                token
            }
        });
        setOffers(await response?.data?.offers);
    }
    
    const getCurrentUserOffers = async (userId) => {
        const response = await axios.get(`${SERVERLINK}/api/offres/allofferforuser/${!userId ? '' : userId}`, {
            headers: { token }
        });
        setPubNumber(await response?.data?.all.length);
        setCurrentUserOffers(await response?.data?.all);
        setSuggestedOffers(await response?.data.all);
    }


    const getSavedOffers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/offres/savedoffers`, {
            headers: {
                token
            }
        });
        setSavedPubNumber(await response?.data?.saved.length)
        setSavedOffers(await response?.data?.saved);
    }

    const getSuggestedOffers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/offres/suggestionoffers`, {
            headers: { token: token }
        })
        setSuggestedOffers(await response?.data?.suggestions);
    }

    const saveOffer = async (offerId) => {

        const response = await fetch(SERVERLINK + '/api/offres/saveoffer/' + await offerId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        await response.json();
    }

    const retireOffer = async (offerId) => {

        const response = await fetch(SERVERLINK + '/api/offres/retireoffer/' + await offerId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        });

        await response.json();
    }

    const getOfferToUpdate = async (offerId) => {
        // console.log("My token: " + token)

        const response = await axios.get(SERVERLINK + '/api/offres/offreToUp/' + offerId, {
            headers: { token: token }
        });
        const offerRes = await response?.data;
        // console.log(await offerRes)
        setUpdateOffer(await offerRes.offer);
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
            getOfferToUpdate,
            saveOffer,
            retireOffer,
            updateOffer,
            setUpdateOffer,
            pubNumber,
            savedPubNumber,
            setSavedPubNumber
        }}>
            {children}
        </OfferContext.Provider>
    )
}

export default OfferProvider;

export const useOffer = () => useContext(OfferContext);