import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthProvider'
import { Button, Icon } from '../../styles/components'
import { SubHeader } from './../../components/pages/SubHeader'
import { ProfileLeft } from './../../components/pages/ProfileLeft'
import RecentlyFriends from './../../components/pages/RecentlyFriends'
import { SERVERLINK } from '../../constants'
import { useApp } from '../../context/AppPorvider'
import OfferCard from '../../components/pages/Offer/OfferCard.jsx'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { personalInformation, getInformation, token } = useAuth()
  const user = personalInformation
  const navigate = useNavigate()

  const {
    friends,
    handleFriends,
    countFollow,
    handleCountFollow,
    allOffers,
    handleOffersSaved,
    savedOffers,
    handleOffersForUser,
    myOffers,
    savedPubNumber,
  } = useApp()

  const [update, setUpdate] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    handleOffersSaved()
    handleOffersForUser()
  }, [])

  const onClick = () => {
    getInformation(token)
    setUpdate(true)
  }

  const annuler = () => {
    setUpdate(false)
  }
  const filterOffers = () => {
    const now = new Date()

    return myOffers.filter((offer) => {
      if (filter === 'all') {
        return true
      } else if (filter === 'ongoing') {
        const scheduledDate = new Date(offer.scheduleddate)

        return now <= scheduledDate
      } else if (filter === 'available') {
        return offer.dispo
      } else if (filter === 'inavailable') {
        return !offer.dispo
      } else if (filter === 'expired') {
        const scheduledDate = new Date(offer.scheduleddate)
        return scheduledDate <= now
      }

      return false
    })
  }

  useEffect(() => {
    handleFriends()
    handleCountFollow()
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full overflow-x-hidden overflow-y-scroll  scrollbar-none h-[86vh] rounded-xl">
      <div className="flex flex-col gap-6">
        <SubHeader icon="bi bi-person-fill" name="Profile" />
        <ProfileLeft
          account={user?.accounttype}
          countFollow={countFollow}
          name={user?.fullName}
          date={user?.date}
          email={user?.email}
          image={SERVERLINK + '/' + user?.profile}
          phone={user?.phone}
          profile
          onClick={onClick}
        />
      </div>
      <div className="flex flex-col gap-6">
        <SubHeader icon="bi bi-person-fill" name="Amis" profile />
        <div className="bg-white-100 flex flex-col gap-4 rounded-lg p-2">
          {friends.length > 0 ? (
            friends
              .slice(0, 4)
              .map((friend) => (
                <RecentlyFriends
                  className="w-full"
                  key={friend.userid}
                  spec={friend.userid}
                  name={friend.firstname + ' ' + friend.lastname}
                  image={SERVERLINK + '/' + friend.profileimage}
                  message
                  retire
                />
              ))
          ) : (
            <div className="text-subtitle-2 text-black-40 text-center">
              No Friend
            </div>
          )}
          <Button variant="secondary" block>
            Voir plus
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <SubHeader
          name="Offres Sauvegardés"
          icon="bi bi-bookmarks-fill"
          rightContent={<p>{savedPubNumber}</p>}
        />
        <div className="flex flex-col gap-4 rounded-lg">
          {savedOffers.length > 0 ? (
            savedOffers.map((savedOffer) => (
              <OfferCard key={savedOffer.saveid} sug={savedOffer} saved />
            ))
          ) : (
            <div className="text-subtitle-2 text-black-40 text-center">
              No offers
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <SubHeader
          name="Vos Offres"
          icon="bi bi-briefcase-fill"
          rightContent={
            <Icon
              onClick={() => navigate(`/profile`)}
              size="sm"
              icon="bi bi-plus-lg"
            />
          }
        />
        <div className=" flex w-full h-fit bg-white-100 justify-around overflow-auto p-2 rounded-2xl scrollbar-none sticky top-0">
          <Button
            className=" bg-primary-40 h-fit"
            children="Tout"
            rounded="full"
            onClick={() => setFilter('all')}
          />
          <Button
            className=" bg-primary-40 h-fit"
            children="En cours"
            rounded="full"
            onClick={() => setFilter('ongoing')}
          />
          <Button
            className=" bg-primary-40 h-fit"
            children="Disponible"
            rounded="full"
            onClick={() => setFilter('available')}
          />
          <Button
            className=" bg-primary-40 h-fit"
            children="Indisponible"
            rounded="full"
            onClick={() => setFilter('inavailable')}
          />
        </div>
        <div className="flex flex-col gap-4 rounded-lg">
          {filterOffers().length > 0 ? (
            filterOffers().map((offer) => (
              <OfferCard key={offer.offerid} sug={offer} mine />
            ))
          ) : (
            <div className="text-subtitle-2 text-black-40 text-center">
              No offers
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
