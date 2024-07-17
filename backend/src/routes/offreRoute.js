import express from 'express';
// protected route

import protectedRoute  from '../middlewares/protectedRoute.js';

// image uploader
import upload from '../middlewares/uploadMiddle.js';
// constollers for the offer
import {  newPublication,
    getHomePageOffersForUser,
    suggestionOffers,
    allOffersForUser,
    deleteOfferForUser,
    updateOfferForUser,
    setUnavailableOfferForUser,
    availableOfferForUser,
    unavailableOfferForUser,
    ongoingOffersForUser,
    expiredOffersForUser, 
    handleOfferAfterNotifClick,} from '../controllers/offreController.js';


const router = express.Router();

// Route for the publications offers
// router.post('/newpublication',protectedRoute,upload.single('imgUrl'),newPublication);
router.post('/newpublication', protectedRoute,upload.single('imgUrl'),newPublication);
router.get('/gethomepageoffers', protectedRoute, getHomePageOffersForUser);
router.get('/suggestionoffers', suggestionOffers);
router.get('/allofferforuser', protectedRoute,allOffersForUser);
router.delete('/deleteofferforuser/:offerId',deleteOfferForUser);
router.put('/updateofferforuser/:offerId',upload.single('imgUrl'),updateOfferForUser);
router.put('/setunavailableoffer/:offerId',setUnavailableOfferForUser);
router.get('/allavailableoffer', protectedRoute, availableOfferForUser);
router.get('/unavailableofferforuser', protectedRoute, unavailableOfferForUser);
router.get('/ongoingofferforuser', protectedRoute,ongoingOffersForUser);
router.get('/expiresofferforuser', protectedRoute,expiredOffersForUser);
router.get('/offerpageafterclick', protectedRoute, handleOfferAfterNotifClick);


// export the modules

export default router;

