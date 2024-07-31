import { useAuth } from '../context/AuthProvider.jsx'
import { SubHeader } from '../components/pages/SubHeader.jsx'
import { Notification } from '../components/pages/Notification.jsx'
import { Button } from '../styles/components.js'
import { appVariants } from '../animations/variants.js'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useApp } from '../context/AppPorvider.jsx'
import { useSocketContext } from '../context/SocketContext.jsx'
import { SERVERLINK } from '../constants/index.js'

const Notifications = () => {
  const { personalInformation, token } = useAuth()
  const user = personalInformation

  const {
    notifications,
    handleNotificationShow,
    handleCountNotifUnread,
  } = useApp()

  const { socket } = useSocketContext()

  useEffect(() => {
    handleNotificationShow()
  }, [])

  const handleSetReadAll = async () => {
    const response = await fetch(SERVERLINK + '/api/notifs/viewnotifs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    })

    const verification = await response.json()

    handleNotificationShow()
    handleCountNotifUnread()
  }

  useEffect(() => {
    handleNotificationShow()
    socket?.on('newNotif', () => {
      handleNotificationShow()
      handleCountNotifUnread()
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
              propos={notif.content}
              spec={notif.sendnotifid}
              vue={notif.viewed}
              date={notif.notifdate}
              icon
            />
          ))
        ) : (
          <span className="text-center text-black-40">
            Pas De Notifications
          </span>
        )}
      </div>
    </motion.section>
  )
}

export default Notifications
