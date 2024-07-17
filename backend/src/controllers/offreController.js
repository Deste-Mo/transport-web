import {createOffer,
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
    getOfferByOfferId} from '../models/offreModel.js';

// handle the offer publication and register the offer for a user in the profile page

export const newPublication = async (req, res) => {
    try {

        // const userId = req.user.userId;
        const userId = 1;
        // use a key table for obtaining the data in the request
        const keys = ['title', 'capacity', 'depart','destination', 'scheduledDate', 'imgUrl'];
        const formData = {};
        keys.map(key => {
            let value = req.body[key];

            // verify if the imgUrl is not empty

            if (key === 'imgUrl' && ( value === '' || value.trim() === '')) value = null;

            formData[key] = value;
        });
        
        formData.userId = userId;

        //create a table with this object
        const data = Object.values(formData);
        // create a new offer
        const offer = await createOffer(data);

        res.status(200).json(offer);

        
    } catch (error) {

        console.error(error);
        res.status(500).json({error: error.message});
        
    }
    
};


// home page function to show offer

export const getHomePageOffersForUser = async (req, res) => {

    try {

        const userId = req.user.userId;

        const result = await getHomepageOffers(userId);

        return res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
        
    }
}

// suggestion offer, show the 10 latest offers available

export const suggestionOffers = async (req, res) => {

    try {
         const result = await latestOffers();

         return res.status(200).json({result});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

// show all offer for an user in his account page

export const allOffersForUser = async (req, res) => {

    const userId = req.user.userId;
     try {

        const allOffers = await getAllOfferById(userId);

        return res.status(200).json(allOffers);
        
     } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
     }

}

// delete offer by offerId

export const deleteOfferForUser = async(req, res) => {

    try {
        const offerId = req.params.offerId;
        
        const result = await deleteOfferById(offerId);

        if(result) {
            res.status(200).json({message: "Publication d'offre supprimée"});
        }else{
            res.status(404).json({message: "Erreur, publication non trouvée"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

//update an offer

export const updateOfferForUser = async (req, res) => {
    try {

        const offerId = req.params.offerId;
        // use a key table for obtaining the data in the request

        const keys = ['title', 'capacity', 'depart','destination', 'scheduledDate', 'imgUrl'];
        const formData ={};
        keys.map(key => {
            let value = req.body[key];

            // verify if the imgUrl is not empty
            if (key === 'imgUrl' && ( value === '' || value.trim() === '')) value = null;

            formData[key] = value;
        });
        
       formData.offerId = offerId;
       // create a table with this object
       const data = Object.values(formData);
        // create a new offer
        const result = await updateOffer(data);

        if(result) {
            res.status(200).json({message: "Publication d'offre modifiée avec succès"});
        }else{
            res.status(404).json({message: "Erreur, publication non trouvée"})
        }

        
    } catch (error) {

        console.error(error);
        res.status(500).json({error: error.message});
        
    }
    
};

//set unavailable the user offer

export const setUnavailableOfferForUser = async (req, res) => {
    try {
        const offerId= req.params.offerId;

        const result = await setunavailableOffer(offerId);

        if(result) {
            res.status(200).json({message: "Publication indisponible maintenant."});
        }else{
            res.status(404).json({message: "Erreur, publication non trouvée"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

// show all available offers for an user in his account page (filter function)

export const availableOfferForUser = async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await allAvailableOffer(userId);

        return res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

// show all unavailable offers (filter function in account page)

export const unavailableOfferForUser = async (req, res) => {

    const userId = req.user.userId;

    try {
        const result = await allUnavailableOffer(userId);

        return res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

// filter function to get ongoings offer for the user

export const ongoingOffersForUser = async (req, res) => {

    try {

        const userId = req.user.userId;

        const result = await ongoingOffer(userId);

        return res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
        
    }
}

// expires offer for the user to show in his account page and for the filter in this page
export const expiredOffersForUser = async (req, res) => {

    try {

        const userId = req.user.userId;

        const result = await expiredOffer(userId);

        return res.status(200).json(result);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
        
    }
}

// function to handle offer page after click on the notification

export const handleOfferAfterNotifClick = async (req, res)=>{
    try {
        const offerId = req.params.offerId;
        const result = await getOfferByOfferId(offerId);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
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