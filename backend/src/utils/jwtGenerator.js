import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'
import pool from '../db/connexion.js';
dotenv.config();

export const generateAccessToken = (user, res, req) => {
    const payload = {
        id: user.userid
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign(payload, JWT_SECRET , {expiresIn: '15m'});

    return token;
}

export const generateRefreshToken = async (user) => {

    const payload = {
        id: user.userid
    }

    const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;


    const refreshToken = jwt.sign(payload, JWT_SECRET_REFRESH , {expiresIn: '7d'});

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
    return refreshToken;
};

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};