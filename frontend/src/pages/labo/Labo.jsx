
import Filter from "../../components/ui/Filter.jsx";
import {CURRENT_USER_OFFER_FILTERS} from "../../constants/index.js";

const Labo = () => {

  return (
    <Filter filterBoxMainTitle="Filtrer les offres par"  filters={CURRENT_USER_OFFER_FILTERS}/>
    )
};

export default Labo;
