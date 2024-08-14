import {lazy, Suspense} from "react";
import OfferCardLoading from "../../loader/OfferCardLoading.jsx";

const OfferCard = lazy(() => import( "./OfferCard.jsx"));

const OfferFeed = ({offers, savedOffers, noOfferMessage = "Pas d'offres"}) => {
    if (!offers || offers?.length === 0) {
        return <div className="nothing-box">{noOfferMessage}</div>;
    }
    
    return (
        <Suspense fallback={<OfferCardLoading/>}>
            {offers?.map((suggestion) => (
                <OfferCard
                    key={suggestion.offerid}
                    sug={suggestion}
                    saved={
                        savedOffers?.length > 0
                            ? savedOffers.find(
                                (offer) => offer.offerid === suggestion.offerid
                            )
                            : false
                    }
                />
            ))}
        </Suspense>
    )
}
export default OfferFeed;