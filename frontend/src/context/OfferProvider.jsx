import { createContext, useContext, useState } from "react";
import { SERVERLINK } from "../constants/index.js";
import axios from "axios";
import { useAuth } from "./AuthProvider.jsx";

const OfferContext = createContext({});

const OfferProvider = ({ children }) => {
  const { token } = useAuth();

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

  const getCurrentUserOffers = async (userId) => {
    const response = await axios.get(
      `${SERVERLINK}/api/offres/allofferforuser/${!userId ? "" : userId}`,
      {
        headers: { token },
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
        headers: { token: token },
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
            headers: { token: token }
        });
        setUpdateOffer(await response?.data?.offer);
        localStorage.removeItem("offerNotifId");
    }

  return (
    <OfferContext.Provider
      value={{
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
