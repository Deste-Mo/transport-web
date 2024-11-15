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
    handleOfferAfterNotifClick,
    savedOffers,
    saveOffer,
    retireOffer,
    deleteAllSaveForUser,
    OfferForUser,
    setAvailableOfferForUser,
    allOffersForUserNotif,
    allOffersForUserId} from '../controllers/offreController.js';


const router = express.Router();

// Route for the publications offers
// router.post('/newpublication',protectedRoute,upload.single('imgUrl'),newPublication);
router.post('/newpublication', protectedRoute,upload.single('imgUrl'),newPublication);
router.get('/gethomepageoffers', protectedRoute, getHomePageOffersForUser);
router.get('/suggestionoffers', protectedRoute, suggestionOffers);

router.get('/savedoffers', protectedRoute, savedOffers);
router.post('/saveoffer/:offerId', protectedRoute, saveOffer);
router.post('/retireoffer/:offerId', protectedRoute, retireOffer);
router.post('/deleteallsave', protectedRoute, deleteAllSaveForUser);

router.get('/allofferforuser/', protectedRoute,allOffersForUser);
router.get('/allofferforuser/:userId', protectedRoute,allOffersForUserId);
router.get('/allofferforuser/:userId/:offerId', protectedRoute,allOffersForUserNotif);
router.get('/offreToUp/:offerId', protectedRoute, OfferForUser);
router.get('/allavailableoffer', protectedRoute, availableOfferForUser);
router.get('/unavailableofferforuser', protectedRoute, unavailableOfferForUser);
router.get('/ongoingofferforuser', protectedRoute,ongoingOffersForUser);
router.get('/expiresofferforuser', protectedRoute,expiredOffersForUser);

router.post('/deleteofferforuser/:offerId', protectedRoute, deleteOfferForUser);
router.post('/updateofferforuser/:offerId',upload.single('imgUrl'), protectedRoute, updateOfferForUser);
router.post('/setunavailableoffer/:offerId', protectedRoute, setUnavailableOfferForUser);
router.post('/setavailableoffer/:offerId', protectedRoute, setAvailableOfferForUser);

router.get('/offerpageafterclick/:offerId', protectedRoute, handleOfferAfterNotifClick);


// export the modules

export default router;

