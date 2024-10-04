import pool from "../db/connexion.js";
import bcrypt from "bcryptjs";

export const createUser = async (user, accountId) => {
    let query = "";
    accountId === 1 ? query = "INSERT INTO users (firstname,companynumber,phone,address,email,bio,profileimage,accountid,password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *" : query = 'INSERT INTO users (firstname,lastname,usercin,phone,address,email,bio,profileimage,accountid,password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *'

    const { rows } = await pool.query(query, user);

    return rows[0];
};

export const updateUser = async (data)=>{


    let query = "";

    !data[0] ? query = "UPDATE users SET firstname = $1, companynumber = $2, phone = $3,address= $4, email = $5, bio= $6, lastname=$7, usercin=$8 WHERE userid = $9 RETURNING *" : query = "UPDATE users SET firstname = $2, companynumber = $3, phone = $4,address= $5, email = $6, bio= $7, lastname=$8, usercin=$9, profileimage = $1 WHERE userid = $10 RETURNING *";

    !data[0] && data.shift();

    const result = await pool.query(query, data);

    return result.rows[0];
}

export const verify = async (userId) => {
    const query = "SELECT (CURRENT_DATE < (enrdate + accessday * INTERVAL '1 day')) as isverify FROM users WHERE userid = $1";
    const update = "UPDATE users SET remday = EXTRACT(DAYS FROM (enrdate + (accessday * INTERVAL '1 days')) - CURRENT_DATE) WHERE userid = $1";
    const update1 = "UPDATE users SET accessday = 0, remday = 0 WHERE userid = $1";
    const { rows } = await pool.query(query, [userId]);

    !rows[0].isverify ? await pool.query(update1, [userId]) : await pool.query(update, [userId]);

    // const rows1 = rows[0].isverify ? await pool.query(update, [userId]) : await pool.query(update1, [userId]);

    return rows[0].isverify;
}

export const getIfUserExist = async (id) => {
    const query = "SELECT count(*) as count FROM users WHERE userid = $1";

    const {rows} = await pool.query(query, [id])

    return rows[0].count;
}

export const getUser = async (email, cin, nif, phone) => {
    const query = "SELECT * FROM users WHERE email = $1 or phone = $2 or usercin = $3 or companynumber = $4";
    const { rows } = await pool.query(query, [email, phone, cin, nif]);
    return rows[0];
};

export const getUserUpdate = async (email, cin, phone, userid) => {
    const query = "SELECT userid FROM users WHERE (email = $1 OR phone = $2 OR usercin = $3) AND userid != $4";
    const { rows } = await pool.query(query, [email, phone, cin, userid]);
    return rows;
};

export const getInformation = async (userId) => {
    const query = "SELECT users.* , account.accounttype FROM USERS INNER JOIN ACCOUNT ON users.accountid = account.accountid  WHERE users.userid = $1 LIMIT 1";
    const { rows } = await pool.query(query,[userId]);
    return rows[0];
}

export const getSubscription = async (subId) => {
    const query = subId ? "SELECT * FROM subscription WHERE subid = $1" : "SELECT * FROM subscription";
    const data = [];
    
    subId && data.push(subId);
    
    const { rows } = await pool.query(query,data);

    return subId ? rows[0] : rows;
}

export const follow = async (userToFollow, userId) => {
    const query = "INSERT INTO follow (followerid, followeeid) VALUES($1, $2) RETURNING *";
    const { rows } = await pool.query(query, [userId, userToFollow]);

    return rows[0];
}

export const unfollow = async (userToUnfollow, userId) => {
    const query = "DELETE FROM follow WHERE (followerid = $1 AND followeeid = $2)";
    const response = await pool.query(query, [userId, userToUnfollow]);

    return response;
}

export const getAllFriend = async (reqSenderId) => {
    const query = "SELECT users.*, account.accounttype FROM users INNER JOIN account ON users.accountid = account.accountid WHERE users.userid != $1 AND users.userid IN (SELECT followeeid FROM follow WHERE followerid = $1);";

    const { rows } = await pool.query(query, [reqSenderId]);

    return rows;
}

export const getCountFollow = async (reqSenderId) => {
    const query = "SELECT count(*) as number FROM users WHERE users.userid != $1 AND users.userid IN (SELECT followeeid FROM follow WHERE followerid = $1);";

    const { rows } = await pool.query(query, [reqSenderId]);

    return rows;
}

export const subscribeUser = async (userId, subId) => {
    const query = "UPDATE USERS SET enrdate = CURRENT_DATE, subid = $2, accessday = ((SELECT duration FROM subscription WHERE subid = $2) + remday) WHERE userid = $1 RETURNING *";

    const { rows } = await pool.query(query, [userId, subId]);

    return rows;
}