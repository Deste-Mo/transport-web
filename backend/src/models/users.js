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

export const getUser = async (email, cin, nif, phone) => {
    const query = "SELECT * FROM users WHERE email = $1 or phone = $2 or usercin = $3 or companynumber = $4";
    const { rows } = await pool.query(query, [email, phone, cin, nif]);
    return rows[0];
};

export const getInformation = async (userId) => {
    const query = "SELECT users.* , account.accounttype FROM USERS INNER JOIN ACCOUNT ON users.accountid = account.accountid  WHERE users.userid = $1 LIMIT 1";
    const { rows } = await pool.query(query, userId);

    return rows[0];
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