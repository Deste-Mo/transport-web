import { allNotifs, createNotifs, createNotifsOne, deleteAllNotifications, deleteNotificationById, getCountNotifUnread, setAllViewNotification, setViewNotification } from "../models/notifModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";



export const getAllNotifs = async (req, res) => {

    try {
        const userId = await req.user.userid;

        const all = await allNotifs(userId);

        if (!all[0]) return res.json({ notifications: {} })

        return res.json({ notifications: all });
    } catch (error) {
        return res.status(500).json({ "getAllError": error.message });
    }
}

export const sendNotifs = async (req, res) => {

    const { userId } = await req.params;
    const sender = await req.user;
    const { content } = await req.body;

    // return res.json(content);

    try {

        const { notification, sendNotif } = await createNotifsOne(userId, sender.userid, content);

        if (notification && sendNotif) {
            // io.TO() est utiliser pour envoyer un evenement a un utilisateur specifique
            const receiverSocketId = getReceiverSocketId(userId);

            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newNotif", notification)
            }
            return res.status(201).json({ notif: notification });
        }

        return res.status(200).json({ message: "Creation de notif impossible!" });

    } catch (error) {
        return res.status(500).json({ "sendNotifsError": error.message });
    }
}

export const sendNotifsNewPub = async (req, res) => {

    const sender = await req.user;
    const { content } = await req.body;

    // return res.json(content);

    try {

        const { notification, sendNotif, followerId } = await createNotifs(sender.userid, content);

        if (notification && sendNotif) {
            // io.TO() est utiliser pour envoyer un evenement a un utilisateur specifique

            console.log(followerId);

            followerId.forEach(userId => {
                const receiverSocketId = getReceiverSocketId(userId.followerid);

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("newNotif", notification)
                }
            });

            return res.status(201).json({ notif: notification });
        }

        return res.status(200).json({ message: "Creation de notif impossible!" });

    } catch (error) {
        return res.status(500).json({ "sendNotifsError": error.message });
    }
}

export const delAllNotifications = async (req, res) => {

    const userid = req.user.userid;


    try {

        const delAll = await deleteAllNotifications(userid);

        if(!delAll) return res.status(400).json({error: "Erreur lors de la suppression des notifications"});

        return res.status(200).json({success: "Tout les notifs sont supprimés"});

    } catch (error) {
        return res.status(500).json({ "delAllNotifsError": error.message });
    }
}

export const deleteNotifications = async (req, res) => {

    const { notifid } = req.params;

    try {

        const del = await deleteNotificationById(notifid);

        if(!del) return res.status(400).json({error: "Erreur lors de la suppression de la notification"});

        return res.status(200).json({success: "La notif est supprimée"});

    } catch (error) {
        return res.status(500).json({ "delOneNotifsError": error.message });
    }
}

export const setNotificationViewed = async (req, res) => {

    const { notifid } = req.params;

    try {

        const setV = await setViewNotification(notifid);

        if(!setV) return res.status(400).json({error: "Erreur lors de la mise en vue de la notification"});

        return res.status(200).json({success: "La notif est vue desormais", view: setV.viewed});

    } catch (error) {
        return res.status(500).json({ "ViewOneNotifsError": error.message });
    }
}

export const setAllNotificationViewed = async (req, res) => {

    const userId = req.user.userid;

    try {

        const setV = await setAllViewNotification(userId);

        if(!setV) return res.status(400).json({error: "Erreur lors de la mise en vue de la notification"});

        return res.status(200).json({success: "La notif est vue desormais", view: setV.viewed});

    } catch (error) {
        return res.status(500).json({ "ViewOneNotifsError": error.message });
    }
}

export const getNotificationViewed = async (req, res) => {

    const userId = req.user.userid;

    try {

        const getV = await getCountNotifUnread(userId);

        if(!getV) return res.status(400).json({error: "Erreur lors de la prise de nombre de non vue des notification"});

        return res.status(200).json({success: "Le nombre de unread notif est obtenu", count: getV.count});

    } catch (error) {
        return res.status(500).json({ "getCountUnreadNotifsError": error.message });
    }
}