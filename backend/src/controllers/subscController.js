import { sendEmail } from "../models/mailModel.js";
import nodemailer from 'nodemailer';
import { getInformation, getSubscription, getUser, subscribeUser } from "../models/users.js";
import { io } from "../socket/socket.js";
export const subscribe = async (req, res) => {
    const { userId, subId } = req.params;
    try {
        const result = await subscribeUser(userId, subId);
        const subscribtion = await getSubscription(subId);
        const user = await getInformation(userId);

        const message = "Vous etes esormais reabonner pour " + (await subscribtion).duration + " jours";

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tosyrazafitsotra@gmail.com',
                pass: 'hpcc Lmwf epmr vxxk'
            }
        });

        const confirmUrl = `http://192.168.0.104:5173/profile/${userId}`;

        const to = user.email;
        const from = 'tosyrazafitsotra@gmail.com';
        const subject = 'Abonnement Effectuez';
        const text = `${message} \n` +
            `Veuillez cliquer sur le lien suivant, ou collez-le dans votre navigateur pour terminer le processus:\n\n` +
            `${confirmUrl}\n`;

        const err = await sendEmail(transporter, to, from, subject, text);

        if (err) {
            return res.status(500).json({ message: err });
        }

        return res.status(200).json({ message: 'Email de Confirmation envoyé' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const sendConfirmMail = async (req, res) => {

    const { subId, userId } = await req.params;

    const user = await getInformation(userId);

    const { phone } = await user;

    const montant = (await getSubscription(subId)).price + " Ar";

    // const montant = await getSubscription(subId);

    try {
        // send confirm mail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tosyrazafitsotra@gmail.com',
                pass: 'hpcc Lmwf epmr vxxk'
            }
        });

        const confirmUrl = 'http://192.168.0.104:5173/api/subscribtion/subscribe/' + userId + '/' + subId;

        const to = "tosyrazafitsotra@gmail.com";
        const from = 'tosyrazafitsotra@gmail.com';
        const subject = 'Abonnement Media-Trans';
        const text = `Vous recevez cet email parce que vous (ou quelqu'un d'autre) a demandé une reabonnement pour Media-Trans.\n\n` +
            `Verifier les information suivant: \n` +
            `Telephone: ${phone}\n` +
            `Montant: ${montant}\n\n` +
            `Veuillez cliquer sur le lien suivant, ou collez-le dans votre navigateur pour terminer le processus:\n\n` +
            `${confirmUrl}\n\n` +
            `Si Des informations ne sont pas correspondant avec votre verification, veuillez ignorer et supprimer cet email et annuler l'abonnement.\n`;

        const err = await sendEmail(transporter, to, from, subject, text);

        if (err) {
            return res.status(500).json({ message: err });
        }

        return res.status(200).json({ message: 'Email de Confirmation envoyé' });

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }

}
export const getAllSubscription = async (req, res) => {
    try {
        
        const subscriptions = await getSubscription();

        return res.status(200).json({subscriptions: subscriptions});

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }

}