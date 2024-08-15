import {
    createOffer,
    getAllOfferById,
    deleteOfferById,
    updateOffer,
    setunavailableOffer,
    allAvailableOffer,
    allUnavailableOffer,
    ongoingOffer,
    expiredOffer,
    latestOffers,
    getHomepageOffers,
    getOfferByOfferId,
    allSavedOffers,
    setSavedOffer,
    retireSavedOffer,
    getOfferById,
    setavailableOffer
} from '../models/offreModel.js';
import { io } from '../socket/socket.js';

// handle the offer publication and register the offer for a user in the profile page

export const newPublication = async (req, res) => {
    try {

        const userId = req.user.userid

        const {
            title,
            description,
            depart,
            destination,
            capacity,
            scheduledDate
        } = req.body;

        // return res.json(req.file)

        // return res.json({body: req.body });

        var data = [];

        if (req.file) {
            const file = req.file.filename;

            data = [
                title,
                capacity,
                depart,
                destination,
                scheduledDate,
                description,
                file,
                userId
            ]
            
        } else {
            data = [
                title,
                capacity,
                depart,
                destination,
                scheduledDate,
                description,
                userId
            ]
        }

        // return res.json(data);

        // create a new offer
        const offer = await createOffer(data);

        if (offer) {
            return res.status(200).json({ offer: offer });
        } else {
            return res.status(400).json({ error: "Erreur lors de la modification de l'image de profile" });
        }

    } catch (error) {

        // console.error(error);
        res.status(500).json({ error: error.message });

    }

};


// home page function to show offer

export const getHomePageOffersForUser = async (req, res) => {

    const userId = await req.user.userid;

    try {

        const result = await getHomepageOffers(userId);

        if(!result[0]) return res.status(200).json({offers: {}})

        return res.status(200).json({offers: result});

    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });

    }
}

// suggestion offer, show the 10 latest offers available

export const suggestionOffers = async (req, res) => {

    const userId = await req.user.userid;

    try {
        const result = await latestOffers(userId);

        if (!result[0]) return res.json({ error: "No offer availaible", suggestions: {} })

        return res.status(200).json({ suggestions: result });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const savedOffers = async (req, res) => {

    const userId = await req.user.userid;

    try {
        const result = await allSavedOffers(userId);

        if (!result[0]) return res.json({ saved: {} })

        return res.status(200).json({ saved: result });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const saveOffer = async (req, res) => {

    const userId = await req.user.userid;

    const { offerId } = await req.params;

    try {
        const result = await setSavedOffer(userId, offerId);

        if (!result) return res.json({ error: "Erreur lors de l'ajout" });

        return res.status(200).json({ success: "Saved successfully" });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const retireOffer = async (req, res) => {

    const userId = await req.user.userid;

    const { offerId } = await req.params;

    try {
        const result = await retireSavedOffer(userId, offerId);

        if (!result) return res.json({ error: "Erreur lors de suppression du sauvegarde publication" })

        return res.status(200).json({ success: "Retire successfully" });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// show all offer for an user in his account page

export const allOffersForUser = async (req, res) => {

    const userId = !req.params.userId ? req.user.userid : req.params.userId;
    
    try {

        const allOffers = await getAllOfferById(userId);

        // console.log("AllOffersBack: " + allOffers)

        if(!allOffers[0]) return res.status(200).json({all: {}})

        return res.status(200).json({ all: allOffers });

    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }

}

export const OfferForUser = async (req, res) => {

    const userId = req.user.userid;

    const { offerId } = req.params;
    
    try {

        const offer = await getOfferById(offerId);

        // console.log("offerBack: " + offer)

        if(!offer) return res.status(200).json({offer: {}})

        return res.status(200).json({ offer: offer });

    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }

}

// delete offer by offerId

export const deleteOfferForUser = async (req, res) => {

    try {
        const offerId = req.params.offerId;

        const result = await deleteOfferById(offerId);

        if (result) {
            res.status(200).json({ message: "Publication d'offre supprimée" });
        } else {
            res.status(404).json({ message: "Erreur, publication non trouvée" })
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }
}

//update an offer

export const updateOfferForUser = async (req, res) => {
    try {

        const { offerId } = req.params;
        
        const {
            title,
            description,
            depart,
            destination,
            capacity,
            scheduledDate
        } = req.body;

        // return res.json(req.file)

        // return res.json({body: req.body });

        var data = [];

        if (req.file) {
            const file = req.file.filename;

            data = [
                title,
                capacity,
                depart,
                destination,
                scheduledDate,
                description,
                file,
                offerId
            ]
            
        } else {
            data = [
                title,
                capacity,
                depart,
                destination,
                scheduledDate,
                description,
                offerId
            ]
        }
        
        // create a new offer
        const result = await updateOffer(data);
        
        if (result) {
            return res.status(200).json({ offer: result });
        } else {
            return res.status(400).json({ error: "Erreur lors de la modification de l'image de profile" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

//set unavailable the user offer

export const setUnavailableOfferForUser = async (req, res) => {
    try {
        const offerId = req.params.offerId;

        const result = await setunavailableOffer(offerId);

        if (result) {
            res.status(200).json({ message: "Publication indisponible maintenant." });
        } else {
            res.status(404).json({ message: "Erreur, publication non trouvée" })
        }

    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const setAvailableOfferForUser = async (req, res) => {
    try {
        const offerId = req.params.offerId;

        const result = await setavailableOffer(offerId);

        if (result) {
            res.status(200).json({ message: "Publication disponible maintenant." });
        } else {
            res.status(404).json({ message: "Erreur, publication non trouvée" })
        }
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// show all available offers for an user in his account page (filter function)

export const availableOfferForUser = async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await allAvailableOffer(userId);

        return res.status(200).json(result);

    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// show all unavailable offers (filter function in account page)

export const unavailableOfferForUser = async (req, res) => {

    const userId = req.user.userId;

    try {
        const result = await allUnavailableOffer(userId);

        return res.status(200).json(result);

    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// filter function to get ongoings offer for the user

export const ongoingOffersForUser = async (req, res) => {

    try {

        const userId = req.user.userId;

        const result = await ongoingOffer(userId);

        return res.status(200).json(result);

    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });

    }
}

// expires offer for the user to show in his account page and for the filter in this page
export const expiredOffersForUser = async (req, res) => {

    try {

        const userId = req.user.userId;

        const result = await expiredOffer(userId);

        return res.status(200).json(result);

    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });

    }
}

// function to handle offer page after click on the notification

export const handleOfferAfterNotifClick = async (req, res) => {
    try {
        const offerId = req.params.offerId;
        const result = await getOfferByOfferId(offerId);

        return res.status(200).json(result);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteAllSaveForUser = async (req, res)=>{

    try {
        const userId = req.user.userid;       

        const deletesave = await deleteAllSaveoffer(userId);

        (deletesave)? res.status(200).json({message:" tout enregistrement supprimé"}) : res.status(400).json({error:"Une erreur c'est produit lors du suppression"});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}



// export default {
//     newPublication,
//     getHomePageOffersForUser,
//     suggestionOffers,
//     allOffersForUser,
//     deleteOfferForUser,
//     updateOfferForUser,
//     setUnavailableOfferForUser,
//     availableOfferForUser,
//     unavailableOfferForUser,
//     ongoingOffersForUser,
//     expiredOffersForUser,

// };