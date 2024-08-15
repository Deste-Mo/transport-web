import jwt from 'jsonwebtoken';
import pkg from 'express';
import pool from '../db/connexion.js';
import { getInformation, verify } from '../models/users.js';

import dotenv from 'dotenv';

dotenv.config();

const { request, response, NextFunction } = pkg;


const protectedRoute = async (req, res, next) => {

    try {

        const jwtToken = await req.header("token");

        const JWT_SECRET = process.env.JWT_SECRET;

        // return res.json(jwtToken)

        if (!jwtToken) {
            return res.status(500).json({ error: "Aucun token prise en charge" });
        }

        const payload = jwt.verify(jwtToken, JWT_SECRET);

        // return res.json(payload);

        if (!payload.id) {
            return res.status(500).json({ error: "Token invalid" });
        }

        // return res.json({ payload : payload })

        const user = await getInformation(payload.id);

        // return res.json({ user })

        // console.log({req});
        // console.log({user});

        const isVerify = await verify(user.userid);

        if (!user) {
            return res.status(500).json({ error: "Utilisateur non trouver" });
        }

        req.user = await user;
        req.isVerify = await isVerify;
        
        next();

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Server error: " + error });
    }

};

export default protectedRoute;