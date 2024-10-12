import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import pool from "../db/connexion.js";
import { error } from 'console';
import { sendEmail } from '../models/mailModel.js';

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = await userResult.rows[0];

        if (!user) {
            return res.status(400).json({ error: 'Utilisateur non trouvé' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 600000);

        await pool.query(
            'UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3',
            [resetToken, resetTokenExpiry, email]
        );

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tosyrazafitsotra@gmail.com',
                pass: 'hpcc Lmwf epmr vxxk'
            }
        });

        const to = email;
        const from = 'tosyrazafitsotra@gmail.com';
        const subject = 'Réinitialisation du Mot de Passe';
        const html = `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
                    <h2 style="color: #333;">Réinitialisation du Mot de Passe</h2>
                    <p>Vous recevez cet email parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation de votre mot de passe.</p>
                    <p>Veuillez cliquer sur le bouton ci-dessous pour réinitialiser votre mot de passe :</p>
                    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #000; background-color: #FBCB34; text-decoration: none; border-radius: 5px;">Réinitialiser le Mot de Passe</a>
                    <p>Si vous n'avez pas demandé cela, veuillez ignorer cet email et votre mot de passe restera inchangé.</p>
                </div>
            `;

        const err = await sendEmail(transporter, to, from, subject, html);

        if (err) {
            return res.status(500).json({ error: err });
        }

        return res.status(200).json({ message: 'Email de réinitialisation envoyé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur du serveur : ' + error.message });
    }
};


export const resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const userResult = await pool.query(
            'SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()',
            [token]
        );
        const user = userResult.rows[0];

        if (!user) {
            return res.status(400).json({ error: 'Votre lien de réinitialisation est expiré' });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);
        await pool.query(
            'UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = $2',
            [hashedPassword, token]
        );

        res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur du serveur' });
    }
};