import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import NewOffer from "../offer/NewOffer";
import { useEffect } from "react";
import Offers from "../Offers";

const ProfileDetails = () => {
  const { personalInformation } = useAuth();
  const currentUser = personalInformation;
  const { id } = useParams();

  useEffect(() => {
    console.log(currentUser);
  }, []);

  return (
    <section className="w-full">
      {currentUser.id === id ? <NewOffer /> : <Offers userId={id}/>}
    </section>
  );
};

export default ProfileDetails;
