import jwt from 'jsonwebtoken';
import pkg from 'express';
import pool from '../db/connexion.js';
import dotenv from 'dotenv';
dotenv.config();
const { request, response, NextFunction } = pkg;
// import cookieParser from 'cookie-parser';
// import express from 'express';

// const app = express();

// app.use(cookieParser());

const protectedRoute = async (req, res, next) => {

    try {

        const jwtToken = req.header("token");

        if (!jwtToken) {
            return res.status(500).json({ error: "Aucun token prise en charge" });
        }

        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET = "secretKey");


        if (!payload) {
            return res.status(500).json({ error: "Token invalid" });
        }

        const user = await pool.query("SELECT users.* , account.accounttype FROM USERS INNER JOIN ACCOUNT ON users.accountid = account.accountid  WHERE userid = $1 LIMIT 1", [payload.user]);

        if (!user.rows[0]) {
            return res.status(500).json({ error: "Utilisateur non trouver" });
        }

        req.user = user.rows[0];

        next();

    } catch (error) {
        console.log(error)
        return res.status(500).send("Server error: " + error);
    }

};

export default protectedRoute;