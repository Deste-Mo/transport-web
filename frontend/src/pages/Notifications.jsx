import { useAuth } from '../context/AuthProvider.jsx'
import { SubHeader } from '../components/pages/SubHeader.jsx'
import { Notification } from '../components/pages/Notification.jsx'
import { Button } from '../styles/components.js'
import { appVariants } from '../animations/variants.js'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useApp } from '../context/AppProvider.jsx'
import { useSocketContext } from '../context/SocketContext.jsx'
import { SERVERLINK } from '../constants/index.js'
import {useNotification} from "../context/NotficationProvider.jsx";

const Notifications = () => {
  const { personalInformation, token } = useAuth();
  const user = personalInformation;


  const { socket } = useSocketContext();
  
  const {notifications, getNotifications, getUnreadNotifications} = useNotification();
  
  const handleSetReadAll = async () => {
    const response = await fetch(SERVERLINK + '/api/notifs/viewnotifs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    })

    const verification = await response.json()
    
    getNotifications();
    getUnreadNotifications();
  }
  
  useEffect(() => {
    getNotifications();
  }, [])

  useEffect(() => {
    getNotifications();
    socket?.on('newNotif', () => {
      getNotifications();
      getUnreadNotifications();
    })
    return () => socket?.off('newNotif')
  }, [socket])

  return (
    <motion.section
      className="flex flex-col items-center justify-center w-full gap-6"
      variants={appVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SubHeader
        name="Notifications"
        icon="bi bi-bell-fill"
        sticky
        rightContent={
          <Button
            onClick={handleSetReadAll}
            size="sm"
            icon="bi bi-check"
            variant="secondary"
            rounded="full"
          >
            Tout marquer comme lu
          </Button>
        }
      />
      <div className="flex flex-col  w-full gap-4">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <Notification
              key={notif.notifid}
              notification={notif}
              viewed={notif.viewed}
              spec={notif.sendnotifid}
              date={notif.notifdate}
              icon
            />
          ))
        ) : (
            <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
              Pas de notificacion
            </p>
        )}
      </div>
    </motion.section>
  )
}

export default Notifications
