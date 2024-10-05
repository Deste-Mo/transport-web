import bcryptjs from 'bcryptjs';
import pool from "../db/connexion.js";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../utils/jwtGenerator.js";
import { createUser, getInformation, getUser } from "../models/users.js";
import * as uuid from "uuid";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { addMinutes, isAfter } from "date-fns";

dotenv.config();

let verificationStore = {}; // Stockage temporaire des codes de vérification

// Fonction pour envoyer un email de vérification
const envoyerEmailVerification = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tosyrazafitsotra@gmail.com",
      pass: "hpcc Lmwf epmr vxxk", // Assurez-vous de ne pas exposer votre mot de passe en production
    },
  });

  const mailOptions = {
    from: "tosyrazafitsotra@gmail.com",
    to: email,
    subject: "Code de vérification",
    text: `Votre code de vérification est : ${code}. Ce code expirera dans 1 minutes.`,
  };

  return transporter.sendMail(mailOptions);
};

// Fonction pour sauvegarder le code de vérification avec l'expiration
const sauvegarderCodeVerification = (email, code, expirationTime) => {
  verificationStore[email] = { code, expirationTime };
};

// Fonction pour récupérer le code de vérification et l'expiration
const recupererCodeVerification = (email) => {
  return verificationStore[email];
};

// Fonction de création de compte avec envoi du code de vérification
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
        return res.status(400).json({
          error:
            "Le numéro d'entreprise et l'email sont obligatoires pour ce type de compte.",
        });
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

    // Vérification du mot de passe
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Les mots de passe ne correspondent pas." });
        }

        // Verifier si l'utilisateur existe deja dans la base de donnees
        const user = await getUser(email, usercin, companynumber, phone);
    if (user) {
      return res.status(400).json({ error: "L'utilisateur existe déjà." });
    }

    // Générer un code de vérification à 6 chiffres et l'heure d'expiration
    const codeVerification = crypto.randomInt(100000, 999999).toString();
    const expirationTime = addMinutes(new Date(), 1); // Expire dans 10 minutes

    // Sauvegarder le code de vérification et l'heure d'expiration
    sauvegarderCodeVerification(email, codeVerification, expirationTime);

    // Envoyer l'email avec le code de vérification
    await envoyerEmailVerification(email, codeVerification);

    // Réponse au client pour indiquer que l'email a été envoyé
    return res
      .status(200)
      .json({ message: "Code de vérification envoyé à votre email." });
  } catch (error) {
    return res.status(500).send("Erreur serveur: " + error.message);
  }
};

export const verifierCodeEtCreerUtilisateur = async (req, res) => {
  try {
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
      confirmPassword,
      code,
    } = req.body;

    const profile = "default.png";
    let data = [];

    // Vérification des champs obligatoires
    if (
      !firstname ||
      !password ||
      !confirmPassword ||
      !phone ||
      !adress ||
      !accountid
    ) {
      return res
        .status(400)
        .json({ error: "Veuillez remplir tous les champs obligatoires." });
    }

    // Vérification selon le type de compte
    if (accountid === 2 || accountid === 3) {
      if (!usercin) {
        return res
          .status(400)
          .json({ error: "Le CIN est obligatoire pour ce type de compte." });
      }
      data = [
        firstname,
        lastname,
        usercin,
        phone,
        adress,
        email,
        bio || "", // Assurez-vous que tous les champs sont définis, même avec une valeur par défaut
        profile,
        accountid,
      ];
    } else if (accountid === 1) {
      if (!companynumber || !email) {
        return res.status(400).json({
          error:
            "Le numéro d'entreprise et l'email sont obligatoires pour ce type de compte.",
        });
      }
      data = [
        firstname,
        companynumber,
        phone,
        adress,
        email,
        bio || "",
        profile,
        accountid,
      ];
    }

    // Vérification du mot de passe
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "Les mots de passe ne correspondent pas." });
    }

    // Vérifier si l'utilisateur existe déjà
    const user = await getUser(email, usercin, companynumber, phone);
        if (user) {
      return res.status(400).json({ error: "L'utilisateur existe déjà." });
    }

    // Récupérer le code de vérification et l'expiration
    const verificationData = await recupererCodeVerification(email);
    if (!verificationData) {
      return res.status(400).json({
        error:
          "Aucun code de vérification trouvé. Veuillez demander un nouveau code.",
      });
        }

    const { code: codeStocké, expirationTime } = verificationData;

    // Vérification de l'expiration du code
    if (isAfter(new Date(), expirationTime)) {
      return res
        .status(400)
        .json({
          error:
            "Le code de vérification a expiré, veuillez demander un nouveau code.",
        });
    }

    // Vérification du code
    if (code !== codeStocké) {
      return res.status(400).json({ error: "Code de vérification incorrect." });
    }

    // Hachage du mot de passe
        const hashedPassword = await hashPassword(password);


        data.push(hashedPassword);

    // Créer l'utilisateur après la vérification
    const nouvelUtilisateur = await createUser(data, accountid);

    // Générer des jetons JWT
    const token = generateAccessToken(nouvelUtilisateur);
    const refToken = await generateRefreshToken(nouvelUtilisateur);

    // Réponse avec les jetons
    return res.json({ token, refToken });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erreur serveur: " + error.message);
  }
};


// Fonction pour renvoyer le code de vérification
export const renvoyerCodeVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const verificationData = recupererCodeVerification(email);

    if (!verificationData) {
      return res.status(400).json({
        error:
          "Aucun code de vérification trouvé. Veuillez demander un nouveau code.",
      });
    }

    const { expirationTime } = verificationData;

    // Vérifier si le code a expiré
    if (isAfter(new Date(), expirationTime)) {
      // Générer un nouveau code de vérification à 6 chiffres et l'heure d'expiration
      const codeVerification = crypto.randomInt(100000, 999999).toString();
      const newExpirationTime = addMinutes(new Date(), 1); // Expire dans 10 minutes

      // Sauvegarder le nouveau code de vérification et l'heure d'expiration
      sauvegarderCodeVerification(email, codeVerification, newExpirationTime);

      // Envoyer l'email avec le nouveau code de vérification
      await envoyerEmailVerification(email, codeVerification);

      return res.status(200).json({
        message: "Nouveau code de vérification envoyé à votre email.",
      });
        }

    return res
      .status(400)
      .json({ error: "Le code de vérification est encore valide." });
    } catch (error) {
    return res.status(500).send("Erreur serveur: " + error.message);
    }
};


export const setImageProfile = async (req, res) => {
    try {
        const id = req.user.userid;

        if (!req.file) {
      return res.status(400).json({ error: "Aucun fichier sélectionné" });
        }

        const profileImage = req.file.filename;

    const user = await pool.query(
      "UPDATE users SET profileimage = $1 WHERE userid = $2 RETURNING *",
      [profileImage, id]
    );

        if (user.rows[0]) {
      return res.status(200).json({ user: user.rows[0] });
        } else {
      return res
        .status(400)
        .json({
          error: "Erreur lors de la modification de l'image de profile",
        });
        }


    } catch (error) {
        return res.status(500).send("Server error: " + error);
    }
};

export const login = async (req, res) => {
    try {

        // prend les information sur le client
    const { email, password } = req.body;

        // Verifier si l'email/telephone existe et que le password correspond
    const userExist = await pool.query(
      "SELECT * FROM users WHERE email = $1 or phone = $1",
      [email]
    );

    if (!userExist.rows[0]) {
      // utilisateur n'existe pas
      return res.status(500).json({ error: "L'utilisateur n'existe pas" });
        }

        const users = userExist.rows[0];

        const isCorrectPassword = await bcryptjs.compare(password, users.password);

        if (!isCorrectPassword) {
      return res.status(500).json({ error: "Mots de passe incorrect" });
        }

        const accessToken = generateAccessToken(users, res);
        const refToken = await generateRefreshToken(users);

        // Generating the cookie
    res.cookie("refreshToken", [refToken, users], {
            httpOnly: true,
            // secure: true,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
        });

        // return res.json({ accessToken, refToken });
    return res.json({ accessToken });
    } catch (error) {
    return res.status(500).json({ error: "Server error: " + error.message });
    }
};

export const logout = async (req, res) => {
    //clear the cookie
    const cookies = res.clearCookie('refreshToken', {
        httpOnly: true,
        // secure: false,
        sameSite: 'strict'
    });

  if (!cookies) return res.status(404).json({ error: "Cookies not found" });
  res.status(200).json({ success: "Utilisateur déconnecté" });
};

export const getMe = async (req, res) => {

    try {

        const user = req.user;
        const isVerify = req.isVerify;
        let profile = req.user;

    const { profileId } = await req.params;

        if (profileId) {
            profile = await getInformation(await profileId);
        }

        if (!user && !profile) {
            return res.status(500).json({error: "L'utilisateur existe pas"});
        }

        return res.status(200).json(
            {
                personalInfo: {
                    id: user.userid,
                    fullName: user.firstname + ((!user.lastname || user.lastname === 'null' ) ? '' : (" " + user.lastname)),
                    firstname: user.firstname,
                    lastname: user.lastname,
                    accounttype: user.accounttype,
                    accountId: user.accountid,
                    usercin: user.usercin,
                    companynumber: user.companynumber,
                    address: user.address,
                    bio: user.bio,
                    profile: user.profileimage,
                    email: user.email,
                    phone: user.phone,
                    date: new Date(user.registerdate).toLocaleDateString(),
                    isVerify: isVerify
                },
                profileInfo: {
                    id: profile.userid,
                    fullName: profile.firstname + ((!profile.lastname || profile.lastname === 'null') ? '' : (" " + profile.lastname)),
                    firstname: profile.firstname,
                    lastname: profile.lastname,
                    accounttype: profile.accounttype,
                    accountId: profile.accountid,
                    usercin: profile.usercin,
                    companynumber: profile.companynumber,
                    address: profile.address,
                    bio: profile.bio,
                    profile: profile.profileimage,
                    email: profile.email,
                    phone: profile.phone,
                    date: new Date(profile.registerdate).toLocaleDateString(),
                }
            });

    } catch (error) {
        return res.status(401).json({error: "Token error: " + error});
    }

}

export const isTokenExpired = (token) => {
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
        return res.status(401).json({error: "Aucun refresh token trouvé"});
    }


    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({error: "Refresh token expiré"});
            }
            return res.status(400).json({error: "Refresh token invalid"});
        }

        // Generate new access token
        const accessToken = generateAccessToken(users);
        return res.status(200).json({accessToken});
    });
};