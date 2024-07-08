import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (user_id, res, req) => {
    const payload = {
        user: user_id
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET = "secretKey", {expiresIn: '15d'});

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "developpement",
    })
    
    return token;
}

export default generateToken;