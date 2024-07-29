import pool from "../db/connexion.js";

export const conversationExist = async (senderId, receiverId) => {


    const query = "SELECT * FROM conversation where (idSender = $1 AND idReceiver = $2) OR (idSender = $2 AND idReceiver = $1)";

    const { rows } = await pool.query(query, [senderId, receiverId]);

    return rows[0];

}

export const createConversation = async (senderId, receiverId) => {

    const query = "INSERT INTO conversation (idSender, idReceiver) VALUES ($1, $2) RETURNING *";

    const { rows } = await pool.query(query, [senderId, receiverId]);

    return rows[0];

}

export const createNewMessage = async (message, conversationId, receiverId, senderId) => {

    const query = "INSERT INTO message (content, idConversation, receiverId) VALUES ($1, $2, $3) RETURNING *";

    const update = "UPDATE conversation SET lastupdate = (SELECT MAX(sentdate) FROM message WHERE message.idconversation = $1 GROUP BY message.idconversation), lastmessage = $2, lastsender = $3 WHERE idconversation = $1 RETURNING *"

    
    const { rows } = await pool.query(query, [message, conversationId, receiverId]);
    
    const answer = await pool.query(update, [conversationId, message, senderId]);
    
    return rows[0];
}

export const getAllConversation = async (reqSenderId) => { // Envoyeur de requette
    const query = "WITH LastConversations AS (SELECT idsender, idreceiver, lastmessage, lastsender, MAX(lastupdate) AS lastdate FROM conversation WHERE idsender = $1 OR idreceiver = $1 GROUP BY idsender, idreceiver, lastmessage,lastsender ) SELECT users.*, account.accounttype, c.lastdate, c.lastmessage, c.lastsender FROM users INNER JOIN account ON users.accountid = account.accountid LEFT JOIN LastConversations c ON (users.userid = c.idsender AND c.idreceiver = $1) OR (users.userid = c.idreceiver AND c.idsender = $1) WHERE users.userid != $1 AND (users.userid IN(SELECT idsender FROM conversation WHERE idreceiver = $1) OR users.userid IN(SELECT idreceiver FROM conversation WHERE idsender = $1)) ORDER BY c.lastdate DESC";

    const { rows } = await pool.query(query, [reqSenderId]);

    return rows;
}

export const getAll = async (reqSenderId) => {
    const query = "SELECT users.*, account.accounttype FROM users INNER JOIN account ON users.accountid = account.accountid WHERE users.userid != $1 AND users.userid NOT IN (SELECT followeeid FROM follow WHERE followerid = $1);";

    const { rows } = await pool.query(query, [reqSenderId]);

    return rows;
}

export const getAllMessages = async (reqSenderId, userIdToChat) => {

    const viewed = "UPDATE message SET viewed = 'T' WHERE receiverid = $1 AND idconversation = (SELECT idconversation FROM conversation WHERE (idsender = $1 AND idreceiver = $2) OR (idsender = $2 AND idreceiver = $1))";

    const setviewed = await pool.query(viewed, [reqSenderId, userIdToChat]);

    const query = "SELECT M.* FROM message M INNER JOIN conversation C ON M.idconversation = C.idconversation WHERE (C.idsender = $1 AND C.idreceiver = $2) OR (C.idsender = $2 AND C.idreceiver = $1) ORDER BY M.sentdate";

    const { rows } = await pool.query(query, [reqSenderId, userIdToChat]);

    return rows;
}

export const messageAllSeen = async (senderId, userToChat) => {

    const query = "SELECT COUNT(viewed) AS number FROM message WHERE viewed = 'F' AND receiverid = $1 AND idconversation = (SELECT idconversation FROM conversation WHERE (idsender = $1 AND idreceiver = $2) OR (idsender = $2 AND idreceiver = $1)) GROUP BY (idConversation)";

    const { rows } = await pool.query(query, [senderId, userToChat]);

    return rows[0];
}

export const unreadConversation = async (senderId) => {

    const query = "SELECT COUNT(idconversation) AS number FROM message WHERE viewed = 'F' AND receiverid = $1 GROUP BY (idconversation)";

    const { rows } = await pool.query(query, [senderId]);

    return rows;
}