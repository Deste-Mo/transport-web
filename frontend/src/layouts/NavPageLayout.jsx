import { Outlet, useLocation } from "react-router-dom";
import { ProfileLeft } from "../components/pages/ProfileLeft.jsx";
import { SubHeader } from "../components/pages/SubHeader.jsx";
import RecentlyFriends from "../components/pages/RecentlyFriends.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import { SERVERLINK } from "../constants/index.js";
import { useApp } from "../context/AppPorvider.jsx";
import { useEffect } from "react";
import { NAVIGATIONS } from "../constants/home.js";
import { Button, Icon } from "../styles/components.js";
import OfferCard from "../components/pages/Offer/OfferCard.jsx";

const NavPageLayout = () => {
    const { personalInformation } = useAuth();
    const user = personalInformation;

    const pathname = useLocation().pathname;

    const { handleOfferSuggestion, suggestions, handleOffersSaved,homeOffers, handleOffersForUser, savedOffers } = useApp();

    useEffect(() => {
        handleOfferSuggestion();
        handleOffersSaved();
        handleOffersForUser();
    }, [])
    
  return (
    <section className="flex items-start  w-full justify-between nav-page-container gap-10 h-[86vh] relative">
      {/*Left subNav*/}
      <div className="fixed bottom-10 right-[20%]">
        <Icon icon="bi bi-briefcase" />
      </div>
      <div className="flex flex-col items-start justify-start gap-10 overflow-x-hidden basis-[26%] overflow-y-scroll max-h-full scrollbar-none relative">
        <ProfileLeft
          id={user.id}
          name={user?.fullName}
          image={SERVERLINK + "/" + user?.profile}
          account={user?.accounttype}
        />
        <div className="flex flex-col gap-3 w-full">
          <DynamicLeftContent currentLocation={pathname} />
        </div>
      </div>

      {/*Center */}
      <div className="overflow-x-hidden overflow-y-scroll max-h-full basis-[44%] scrollbar-none rounded-xl">
        <Outlet />
      </div>

      {/*Right subNav*/}
      <div className=" max-h-full flex flex-col gap-10 overflow-x-hidden basis-[26%] scrollbar-none">
        <div className="flex flex-col gap-4 w-full">
          <SubHeader
            name="Offres Sauvegardées"
            icon="bi bi-person-fill"
            size="md"
          />
            {
            savedOffers.length > 0 ? (
            savedOffers.map((savedOffer) => (<OfferCard key={savedOffer.saveid} sug={savedOffer} saved />))
            ) : (
            <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
              Pas de sauvegarde pour l'instant
            </p>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <SubHeader name="Sugfestions d'offres" icon="bi bi-robot" />
            {
                suggestions.length > 0 ? (
                    suggestions.map((suggestion) => (<OfferCard detailedProfile={false} key={suggestion.offerid} sug={suggestion} saved={ savedOffers.length > 0 ? savedOffers.find(offer => offer.offerid === suggestion.offerid) : false }/>))

                ) : (
                    <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
                        Pas de sauvegarde pour l'instant
                    </p>
                )}
        </div>
      </div>
    </section>
  );
};
export default NavPageLayout;

const DynamicLeftContent = ({ currentLocation }) => {
  const { friends, users } = useApp();
  

  switch (currentLocation) {
    case NAVIGATIONS.home:
      return (
        <>
          <SubHeader name="Amis" icon="bi bi-person" />
          <div className="flex flex-col gap-3 rounded-lg p-4 bg-white-100 dark:bg-black-100">
            {friends.length > 0 ? (
              friends.map((friend) => (
                <RecentlyFriends
                  className="w-full"
                  key={friend.userid}
                  spec={friend.userid}
                  name={friend.firstname + " " + friend.lastname}
                  image={SERVERLINK + "/" + friend.profileimage}
                />
              ))
            ) : (
              <Button block icon="bi bi-plus-lg">Ajouter un ami</Button>
            )}
          </div>
        </>
      );

    case NAVIGATIONS.friend:
      return (
        <>
          <SubHeader name="Suggestion d'amis" icon="bi bi-person" />
          <div className="flex flex-col items-center justify-center gap-6 p-4 w-full bg-white-100 dark:bg-black-100 rounded-xl">
            {users.length > 0 ? (
              users.map((us) => (
                <RecentlyFriends
                  className="w-full"
                  key={us.userid}
                  spec={us.userid}
                  account={us.accounttype}
                  name={us.firstname + " " + us.lastname}
                  image={SERVERLINK + "/" + us.profileimage}
                  showAddFriendButton
                  showProfileButton={false}
                />
              ))
            ) : (
              <div>Pas d'amis</div>
            )}
          </div>
        </>
      );

    default:
      return (
        <>
          <SubHeader name="Amis" icon="bi bi-person" />
          <div className="flex flex-col gap-3 rounded-lg p-4 bg-white-100 dark:bg-black-100">
            {friends.length > 0 ? (
              friends.map((friend) => (
                <RecentlyFriends
                  className="w-full"
                  key={friend.userid}
                  spec={friend.userid}
                  name={friend.firstname + " " + friend.lastname}
                  image={SERVERLINK + "/" + friend.profileimage}
                />
              ))
            ) : (
              <div>No friends</div>
            )}
          </div>
        </>
      );
  }
};
