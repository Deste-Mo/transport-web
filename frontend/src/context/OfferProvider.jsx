import {createContext, useContext, useState} from "react";
import {SERVERLINK} from "../constants/index.js";
import axios from "axios";
import {useAuth} from "./AuthProvider.jsx";

const OfferContext = createContext({});

const OfferProvider = ({children}) => {
    const { token } = useAuth()
    
    const [offers, setOffers] = useState([]);
    const [currentUserOffers, setCurrentUserOffers] = useState([]);
    const [suggestedOffers, setSuggestedOffers] = useState([]);
    const [savedOffers, setSavedOffers] = useState([]);
    const [savedOfferLength, setSavedOfferLength] = useState(0);
    
    const getOffers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/offres/gethomepageOffers`, {
            headers: {
                "token": token
            }
        });
        setOffers(await response?.data?.offers);
    }
    
    const getSavedOffers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/offres/savedoffers`, {
            headers: {
                "token": token
            }
        });
        setSavedOfferLength(await response?.data?.saved.length);
        setSavedOffers(await response?.data?.saved);
    }
    
    const getSuggestedOffers = async () => {
        const response = await axios.get(`${SERVERLINK}/api/offres/suggestionoffers`, {
            headers : {token : token}
        })
        
        setSuggestedOffers(await response?.data?.suggestions);
    }
    
    
    
  return (
      <OfferContext.Provider value={{
          offers,
          savedOffers,
          suggestedOffers,
          currentUserOffers,
          savedOfferLength,
          getOffers,
          getSavedOffers,
          getSuggestedOffers,
      }}>
        {children}
      </OfferContext.Provider>
  )
} 

export default OfferProvider;

export const useOffer = ()=> useContext(OfferContext);