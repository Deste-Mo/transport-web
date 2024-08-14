import { lazy, Suspense, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Button, Icon } from "../../styles/components";
import { SubHeader } from "./../../components/pages/SubHeader";
import RecentlyFriends from "./../../components/pages/RecentlyFriends";
import { SERVERLINK } from "../../constants";
import OfferCard from "../../components/pages/Offer/OfferCard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserProvider.jsx";
import { useOffer } from "../../context/OfferProvider.jsx";
import Offers from "../Offers.jsx";
import ProfileCardLoading from "../../components/loader/ProfileCardLoading.jsx";
const ProfileCard = lazy(() => import("../../components/pages/profile/ProfileCard.jsx"));

export default function Profile() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { personalInformation, getInformation, token, profileInfo } = useAuth();

  const {
    getFriends,
    followersCount,
    friendFollowerCount,
    profileFriends,
    friends,
  } = useUser();
  const {
    getSavedOffers,
    savedOffers,
    currentUserOffers,
    getCurrentUserOffers,
  } = useOffer();
  
  useEffect(() => {
    getSavedOffers();
    getCurrentUserOffers();
  }, []);

  useEffect(() => {
    getFriends(id);
    getCurrentUserOffers(id);
    getInformation(token, id);
  }, [id]);
  return (
    <div className="flex flex-col gap-6 w-full overflow-x-hidden overflow-y-scroll  scrollbar-none h-[86vh] rounded-xl">
      <div className="flex flex-col gap-6">
        <SubHeader icon="bi bi-person-fill" name="Profile" />
        <Suspense fallback={<ProfileCardLoading />}>
          <ProfileCard
            id={profileInfo.id}
            account={profileInfo?.accounttype}
            countFollow={followersCount}
            name={profileInfo?.fullName}
            date={profileInfo?.date}
            email={profileInfo?.email}
            image={SERVERLINK + "/" + profileInfo?.profile}
            phone={profileInfo?.phone}
            forCurrentUser={profileInfo.id === personalInformation.id}
          />
        </Suspense>
      </div>
      <div className="flex flex-col gap-6">
        <SubHeader
          icon="bi bi-broadcast"
          name={`Suivi(e)${friendFollowerCount > 1 ? "s" : ""}`}
          rightContent={
            <p className="text-black-100 dark:text-white-100">
              {friendFollowerCount}
            </p>
          }
        />
        <div className="bg-white-100 dark:bg-white-0 flex flex-col gap-4 rounded-xl p-2">
          {profileFriends.length > 0 ? (
            profileFriends
              .slice(0, 4)
              .map((friend) => (
                <RecentlyFriends
                  className="w-full"
                  key={friend.userid}
                  spec={friend.userid}
                  name={
                    friend.firstname +
                    (!friend.lastname ? "" : " " + friend.lastname)
                  }
                  image={SERVERLINK + "/" + friend.profileimage}
                  message
                  showRemoveFriendButton={
                    friends.length > 0
                      ? friends.find((fr) => fr.userid === friend.userid)
                      : false
                  }
                  showAddFriendButton={
                    friends.length > 0
                      ? !friends.find((fr) => fr.userid === friend.userid)
                      : false
                  }
                />
              ))
          ) : (
            <div className="nothing-box">Pas d'amis</div>
          )}
          <Button variant="secondary" block>
            Voir plus
          </Button>
        </div>
      </div>
      {/*For mobile screen*/}
      {/*For other user*/}
      {profileInfo.id !== personalInformation.id && (
        <div className="md:hidden visible">
          <Offers userId={id} />
        </div>
      )}
      {/* For the current user */}
      {profileInfo.id === personalInformation.id && (
        <>
          <div className="flex flex-col gap-6">
            <SubHeader
              name="Offres Sauvegardés"
              icon="bi bi-bookmarks-fill"
              rightContent={
                <p className="text-black-80 dark:text-white-100">
                  {savedOffers?.length}
                </p>
              }
            />
            <div className="flex flex-col gap-4 rounded-lg">
              {savedOffers.length > 0 ? (
                savedOffers.map((savedOffer) => (
                  <OfferCard key={savedOffer.saveid} sug={savedOffer} saved />
                ))
              ) : (
                <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
                  Pas de sauvegarde pour l'instant
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <SubHeader
              name="Vos Offres"
              icon="bi bi-briefcase-fill"
              rightContent={
                <Icon
                  onClick={() => navigate(`/profile/${id}/newOffer`)}
                  size="sm"
                  icon="bi bi-plus-lg"
                />
              }
            />
            <div className="flex flex-col gap-4 rounded-lg">
              {currentUserOffers.length > 0 ? (
                currentUserOffers.map((currentUserOffer) => (
                  <OfferCard
                    forCurrentUser
                    key={currentUserOffer.offerid}
                    sug={currentUserOffer}
                  />
                ))
              ) : (
                <div className="nothing-box">Pas d'offres</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
