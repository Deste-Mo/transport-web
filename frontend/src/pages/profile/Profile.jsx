import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { Button } from '../../styles/components';
import Offer from '../offer/Offer';
import { ForAll } from './../../components/pages/ForAll';
import { ProfilLeft } from './../../components/pages/ProfilLeft';
import RecentlyFriends from './../../components/pages/RecentlyFriends';
import ProfileEdit from './ProfileEdit';
import { SERVERLINK } from '../../constants';
import { useApp } from '../../context/AppPorvider';


export default function Profiler() {


  const { personalInformation } = useAuth();
  const user = personalInformation;

  const { friends, handleFriends, countFollow, handleCountFollow } = useApp();

  const [update, setUpdate] = useState(false)

  const onClick = () => { setUpdate(true) }

  const annuler = () => { setUpdate(false) }

  useEffect(() => {
    handleFriends();
    handleCountFollow();
  }, [friends, handleFriends]);


  return (
    <section className='flex items-start  w-full justify-between nav-page-container gap-4'>
      <div className='flex flex-col gap-6 w-full overflow-x-hidden overflow-y-scroll max-h-[100vh]  basis-[40%] scrollbar-none'>
        <div className='flex flex-col gap-4'>
          <ForAll icon='bi bi-person' name='Profile' />
          <ProfilLeft account={user?.accounttype} countFollow={countFollow} name={user?.fullName} date={user?.date} email={user?.email} image={SERVERLINK + "/" + user?.profile} phone={user?.phone} profile onClick={onClick} />
        </div>
        <div className='flex flex-col gap-4'>
          <ForAll icon='bi bi-person' name='Amis' profile />
          <div className='bg-white-100 flex flex-col gap-4 rounded-lg p-2'>
            {
              friends.length > 0 ?
              friends.map(friend => (
                <RecentlyFriends className="w-full" key={friend.userid} spec={friend.userid} name={friend.firstname + " " + friend.lastname} image={SERVERLINK + "/" + friend.profileimage} message retire />
              )) :
              <div>No friends</div>
            }
            <Button variant='secondary' block>Voir plus</Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-6 w-full overflow-x-hidden overflow-y-scroll max-h-[100vh]  basis-[60%] scrollbar-none'>
        {update ? <ProfileEdit onClick={annuler} /> : <Offer />}
      </div>
    </section>
  )
}