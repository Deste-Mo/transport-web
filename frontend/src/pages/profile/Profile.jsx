import {lazy, Suspense, useEffect} from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Button, Icon } from '../../styles/components';
import { SubHeader } from './../../components/pages/SubHeader';
import RecentlyFriends from './../../components/pages/RecentlyFriends';
import { SERVERLINK } from '../../constants';
import OfferCard from "../../components/pages/Offer/OfferCard.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../context/UserProvider.jsx";
import {useOffer} from "../../context/OfferProvider.jsx";
import ProfileCardLoading from "../../components/loader/ProfileCardLoading.jsx";
import FriendCardLoading from "../../components/loader/FriendCardLoading.jsx";
const ProfileCard = lazy(() => import("../../components/pages/profile/ProfileCard.jsx"));

export default function Profile() {
    const {id} = useParams();
    const navigate = useNavigate();
    
    const { personalInformation, loadingInformation } = useAuth();
    const {friends,getFriends, followersCount, getFollowersCount, loadingFriend} = useUser();
    const {getSavedOffers, savedOffers, currentUserOffers} = useOffer();
    
    const user = personalInformation;
    

    useEffect(() => {
        getFriends();
        getSavedOffers();
        getFollowersCount();
    }, []);
    
    
  return (
    <div className="flex flex-col gap-6 w-full overflow-x-hidden overflow-y-scroll  scrollbar-none h-[86vh] rounded-xl">
      <div className="flex flex-col gap-6">
        <SubHeader icon="bi bi-person-fill" name="Profile" />
          {
              loadingInformation ? <ProfileCardLoading/> : <ProfileCard
                  id={user.id}
                  account={user?.accounttype}
                  countFollow={followersCount}
                  name={user?.fullName}
                  date={user?.date}
                  email={user?.email}
                  image={SERVERLINK + "/" + user?.profile}
                  phone={user?.phone}
                  forCurrentUser={user.id === id}
              />
          }
      </div>
      <div className="flex flex-col gap-6">
          <SubHeader icon="bi bi-person-fill" name="Amis" rightContent={<p className="text-black-100 dark:text-white-100">{followersCount}</p>} />
        <div className="bg-white-100 dark:bg-black-100 flex flex-col gap-4 rounded-lg p-2">
          {friends.length > 0 ? 
              loadingFriend ? <FriendCardLoading/> : (
                  friends
                      .slice(0, 4)
                      .map((friend) => (
                          <RecentlyFriends
                              className="w-full"
                              key={friend.userid}
                              spec={friend.userid}
                              name={friend.firstname + " " + friend.lastname}
                              image={SERVERLINK + "/" + friend.profileimage}
                              message
                              showRemoveFriendButton
                          />
                      ))
          ) : (
            <div>Pas d'amis</div>
          )}
          <Button variant="secondary" block>
            Voir plus
          </Button>
        </div>
      </div>
      {/* For the current user */}
      {user.id === id && (
        <>
          <div className="flex flex-col gap-6">
            <SubHeader
              name="Offres Sauvegardés"
              icon="bi bi-bookmarks-fill"
              rightContent={<p className="text-black-80 dark:text-white-100">{savedOffers?.length}</p>}
            />
            <div className="flex flex-col gap-4 rounded-lg">
                {
                    savedOffers.length > 0 ? (
                            savedOffers.map((savedOffer) => (<OfferCard key={savedOffer.saveid} sug={savedOffer} saved/>))
                        ) :
                        <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
                            Pas de sauvegarde pour l'instant
                        </p>
                }
            </div>
          </div>
            <div className="flex flex-col gap-6">
                <SubHeader
                    name="Vos Offres"
                    icon="bi bi-briefcase-fill"
                    rightContent={
                        <Icon
                            onClick={() => navigate(`/profile/${id}`)}
                  size="sm"
                  icon="bi bi-plus-lg"
                />
              }
            />
            <div className="flex flex-col gap-4 rounded-lg">
                {
                    currentUserOffers.length > 0 ? (
                            currentUserOffers.map((currentUserOffer) => (<OfferCard forCurrentUser key={currentUserOffer.offerid} sug={currentUserOffer} mine />))
                        ) :
                        <div className='text-subtitle-2 text-black-40 text-center'>No offers</div>
                }
            </div>
          </div>
        </>
      )}
    </div>
  );
}

