import bcryptjs from 'bcryptjs';
import pool from "../db/connexion.js";
import {generateAccessToken, generateRefreshToken, hashPassword} from '../utils/jwtGenerator.js';
import {createUser, getUser} from '../models/users.js';
import * as uuid from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const signup = async (req, res) => {
    try {
        // Prend les information du clients side

        const {
            firstname,
            lastname,
            usercin,
            companynumber,
            phone,
            adress,
            email,
            bio,
            profileimage,
            accountid,
            password,
            confirmPassword
        } = await req.body;


        const profile = "default.png";

        var data = [];

        // Verifie si les champs sont vide
        if (!firstname || !password || !confirmPassword || !phone || !adress || !accountid) {
            return res.status(400).json({error: "Completer tous les champs s'il vous plait"});
        }

        if (accountid === 2 || accountid === 3) {
            if (!usercin) {
                return res.status(400).json({error: "Completer tous les champs Obligatoire s'il vous plait (CIN)"});
            }

            data = [
                firstname,
                lastname,
                usercin,
                phone,
                adress,
                email,
                bio,
                profile,
                accountid
            ];

        } else if (accountid === 1) {
            if (!companynumber || !email) {
                return res.status(400).json({error: "Completer tous les champs s'il vous plait (companyNumber / email)"});
            }

            data = [
                firstname,
                companynumber,
                phone,
                adress,
                email,
                bio,
                profile,
                accountid
            ];
        }

        // Verifie si le mots de passe correspond a celui du confirmation
        if (password != confirmPassword) {
            return res.status(400).json({error: "Mots de passe ne correspond pas"});
        }

        // Verifier si l'utilisateur existe deja dans la base de donnees
        const user = await getUser(email, usercin, companynumber, phone);

        if (user) {
            return res.status(400).json({error: "L'utilisateur existe Dejas"});
        }

        // Crypter le mots de passe
        const hashedPassword = await hashPassword(password);


        data.push(hashedPassword);


        const createUsers = await createUser(data, accountid);

        if (createUsers) {
            const token = generateAccessToken(createUsers, res);
            const refToken = await generateRefreshToken(createUsers);


            return res.json({token, refToken});

        } else {
            return res.status(400).json({error: "Donnee incoherents"});
        }

    } catch (error) {
        return res.status(500).send("Server error: " + error.message);
    }
};


export const setImageProfile = async (req, res) => {
    try {
        const id = req.user.userid;

        if (!req.file) {
            return res.status(400).json({error: "Aucun fichier sélectionné"});
        }

        const profileImage = req.file.filename;

        const user = await pool.query("UPDATE users SET profileimage = $1 WHERE userid = $2 RETURNING *", [profileImage, id]);

        if (user.rows[0]) {
            return res.status(200).json({user: user.rows[0]});
        } else {
            return res.status(400).json({error: "Erreur lors de la modification de l'image de profile"});
        }


    } catch (error) {
        return res.status(500).send("Server error: " + error);
    }
}


export const login = async (req, res) => {
    try {

        // prend les information sur le client
        const {email, password} = req.body;

        // Verifier si l'email/telephone existe et que le password correspond
        const userExist = await pool.query("SELECT * FROM users WHERE email = $1 or phone = $2", [email, email]);

        if (!userExist.rows[0]) {// utilisateur n'existe pas
            return res.status(500).json({error: "L'utilisateur n'existe pas"});
        }

        const users = userExist.rows[0];

        const isCorrectPassword = await bcryptjs.compare(password, users.password);

        if (!isCorrectPassword) {
            return res.status(500).json({error: "Mots de passe incorrect"});
        }

        const accessToken = generateAccessToken(users, res);
        const refToken = await generateRefreshToken(users);

        // Generating the cookie
        res.cookie('refreshToken', [refToken, users], {
            httpOnly: true,
            // secure: true,
            sameSite: 'Lax',
            maxAge:  7 * 24 * 60 * 60 * 1000 // 7 jours
        });
        
        // return res.json({ accessToken, refToken });
        return res.json({accessToken});
    } catch (error) {
        return res.status(500).json({error: "Server error: " + error.message});
    }
};

export const logout = async (req, res) => {
    //clear the cookie
    const cookies = res.clearCookie('refreshToken', {
        httpOnly: true,
        // secure: false,
        sameSite: 'strict'
    });

    if (!cookies) return res.status(404).json({error: "Cookies not found"});
    res.status(200).json({success: "Utilisateur déconnecté"})

}

export const getMe = async (req, res) => {

    try {

        const user = req.user;

        if (!user) {
            return res.status(500).json({error: "L'utilisateur existe pas"});
        }

        let fullname = "";

        if (!user.lastname) {
            fullname = user.firstname;
        } else {
            fullname = user.firstname + " " + user.lastname;
        }

        return res.status(200).json({
            id: user.userid,
            fullName: fullname,
            firstname: user.firstname,
            lastname: user.lastname,
            accounttype: user.accounttype,
            usercin: user.usercin,
            companynumber: user.companynumber,
            address: user.address,
            bio: user.bio,
            profile: user.profileimage,
            email: user.email,
            phone: user.phone,
            date: new Date(user.registerdate).toLocaleDateString(),
        });

    } catch (error) {
        return res.status(401).json({error: "Token error: " + error});
    }

}

const isTokenExpired = (token) => {
    try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.exp) {
            new Error('Invalid token');
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};

export const refreshAccessToken = async (req, res) => {
    const [refreshToken, users] = req.cookies.refreshToken || [null, null];

    if (!refreshToken || !users) {
        return res.status(401).json({ error: "Aucun refresh token trouvé" });
    }
    
    

    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Refresh token expiré" });
            }
            return res.status(400).json({ error: "Refresh token invalid" });
        }

        // Generate new access token
        const accessToken = generateAccessToken(users);
        return res.status(200).json({ accessToken });
    });
};