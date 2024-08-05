import jwt from 'jsonwebtoken';
import pkg from 'express';
import pool from '../db/connexion.js';
import { getInformation } from '../models/users.js';

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

        const user = await getInformation([payload.id]);

        if (!user) {
            return res.status(500).json({ error: "Utilisateur non trouver" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Server error: " + error });
    }

};

export default protectedRoute;