import pool from '../db/connexion.js';

export const allNotifs = async (userId) => {

    const query = "SELECT N.*,S.sendnotifid, S.viewed FROM notifications N INNER JOIN sendnotification S ON N.notifid = S.notifid WHERE S.userid = $1 ORDER BY N.notifid DESC";

    const { rows } = await pool.query(query, [userId]);

    // console.log(rows[0])

    return rows;
}

export const createNotifs = async (senderId, content, offerId) => {

    const query = "INSERT INTO notifications(senderId, content, link) VALUES ($1, $2, $3) RETURNING *";

    const sendNotif = "INSERT INTO sendnotification (userid, notifid) SELECT followerid,$2 FROM follow WHERE followeeid = $1 RETURNING *";

    const follower = "SELECT followerid FROM follow WHERE followeeid = $1";

    const { rows } = await pool.query(query, [senderId, content, offerId]);

    const notifid = rows[0].notifid;

    const rows_1 = (await pool.query(sendNotif, [senderId, notifid])).rows;

    const followerId = (await pool.query(follower, [senderId])).rows;

    return {  notification: rows[0], sendNotif: rows_1[0], followerId }
}

export const createNotifsOne = async (userId, senderId, content) => {

    const query = "INSERT INTO notifications(senderId, content) VALUES ($1, $2) RETURNING *";

    const sendNotif = "INSERT INTO sendnotification (userid, notifid) VALUES ($1, $2) RETURNING *"

    const { rows } = await pool.query(query, [senderId, content]);

    const notifid = await rows[0].notifid;

    const rows_1 = (await pool.query(sendNotif, [userId, notifid])).rows;

    return {  notification: rows[0], sendNotif: rows_1[0] }
}


//delete all notifications

export const deleteAllNotifications = async (userId) =>{
    const query = "DELETE FROM sendnotification WHERE userId = $1";
 
    const result = await pool.query(query, [userId]);
 
    return result.rowCount;
 
}
 
 // delete a notification
 
 export const deleteNotificationById = async (notifId) =>{
    const query = "DELETE FROM sendnotification WHERE sendnotifid = $1 RETURNING *";
 
    const result = await pool.query(query, [notifId]);
 
    return result.rowCount;
 }
 
 // set views a notification
 export const setViewNotification = async (notifId) => {
    const query = "UPDATE sendnotification SET viewed = TRUE WHERE sendnotifid = $1 RETURNING *";
 
    const result = await pool.query(query, [notifId]);
 
    return result.rows[0];
 }

 export const setAllViewNotification = async (userId) => {
    const query = "UPDATE sendnotification SET viewed = TRUE WHERE userId = $1 RETURNING *";
 
    const result = await pool.query(query, [userId]);
 
    return result.rows[0];
 }

 // GET count de notif unread
 export const getCountNotifUnread = async (userId) => {
    const query = "SELECT count(sendnotifid) as count FROM sendnotification WHERE userid = $1 AND viewed = false";
 
    const result = await pool.query(query, [userId]);
 
    return result.rows[0];
 }