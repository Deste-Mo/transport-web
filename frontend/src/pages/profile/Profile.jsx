import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Button, Icon } from '../../styles/components';
import { SubHeader } from './../../components/pages/SubHeader';
import { ProfileLeft } from './../../components/pages/ProfileLeft';
import RecentlyFriends from './../../components/pages/RecentlyFriends';
import { SERVERLINK } from '../../constants';
import { useApp } from '../../context/AppPorvider';
import OfferCard from "../../components/pages/Offer/OfferCard.jsx";
import { useNavigate } from "react-router-dom";


export default function Profile() {
    const { personalInformation } = useAuth();
    const user = personalInformation;
    const navigate = useNavigate();

    const { friends, handleFriends, countFollow, handleCountFollow, allOffers, handleOfferSuggestion, suggestions } = useApp();

    const [update, setUpdate] = useState(false)

    const onClick = () => {
        setUpdate(true);
    }

    useEffect(() => {
        handleOfferSuggestion();
    }, [])

    const annuler = () => {
        setUpdate(false)
    }

    console.log("My offers: " + allOffers);

    useEffect(() => {
        handleFriends();
        handleCountFollow();
    }, []);

    return (
        <div
            className='flex flex-col gap-6 w-full overflow-x-hidden overflow-y-scroll  scrollbar-none h-[86vh] rounded-xl'>
            <div className='flex flex-col gap-6'>
                <SubHeader icon='bi bi-person-fill' name='Profile' />
                <ProfileLeft account={user?.accounttype} countFollow={countFollow} name={user?.fullName}
                    date={user?.date} email={user?.email} image={SERVERLINK + "/" + user?.profile}
                    phone={user?.phone} profile onClick={onClick} />
            </div>
            <div className='flex flex-col gap-6'>
                <SubHeader icon='bi bi-person-fill' name='Amis' profile />
                <div className='bg-white-100 flex flex-col gap-4 rounded-lg p-2'>
                    {
                        friends.length > 0 ?
                            friends.slice(0, 4).map(friend => (
                                <RecentlyFriends className="w-full" key={friend.userid} spec={friend.userid}
                                    name={friend.firstname + " " + friend.lastname}
                                    image={SERVERLINK + "/" + friend.profileimage} message retire />
                            )) :
                            <div>No friends</div>
                    }
                    <Button variant='secondary' block>Voir plus</Button>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <SubHeader name="Offres Sauvegardés" icon="bi bi-bookmarks-fill" rightContent={<p>4</p>} />
                <div className="flex flex-col gap-4 rounded-lg">
                    {
                        suggestions.length > 0 ? (
                            suggestions.map((suggestion) => (<OfferCard key={suggestion.offerid} sug={suggestion} />))
                        ) :
                            <div>No offers</div>
                    }
                </div>
            </div>
            <div className="flex flex-col gap-6">
                <SubHeader name="Vos Offres" icon="bi bi-briefcase-fill" rightContent={<Icon onClick={() => navigate(`/profile`)} size='sm' icon="bi bi-plus-lg" />} />
                <div className="flex flex-col gap-4 rounded-lg">
                    {
                        suggestions.length > 0 ? (
                            suggestions.map((suggestion) => (<OfferCard key={suggestion.offerid} sug={suggestion} />))
                        ) :
                            <div>No offers</div>
                    }
                </div>
            </div>
        </div>
    )
}