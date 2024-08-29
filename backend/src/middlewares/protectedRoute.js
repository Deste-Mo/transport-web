import jwt from 'jsonwebtoken'; // importation de JWT
import { getInformation, verify } from '../models/users.js';
import dotenv from 'dotenv';
dotenv.config();
const protectedRoute = async (req, res, next) => {
    try {
        const jwtToken = await req.header("token"); // Verifie si la clé existe
        const JWT_SECRET = process.env.JWT_SECRET; // prend le code secret pour la verification
        if (!jwtToken) { // Si la clé n'existe pas renvoyer une erreur sinon continuer
            return res.status(500).json({ error: "Aucun token prise en charge" });
        }

        const payload = jwt.verify(jwtToken, JWT_SECRET); // verifie si la clé correspond

        if (!payload.id) { // si la clé ne correspond pas renvoyer une erreur sinon continuer
            return res.status(500).json({ error: "Token invalid" });
        }

        // Obenir les information de l'utilisateur 
        const user = await getInformation(payload.id);

        // Verifie si l'utilisateur l'abonnement de l'utilisateur est toujours valide
        const isVerify = await verify(user.userid);

        if (!user) { // Si l'utilisateur n'est pas trouver retourner une erreur
            return res.status(500).json({ error: "Utilisateur non trouver" });
        }

        req.user = await user; // Renvoyer l'utilisateur dans la l'entete de requete suivant
        req.isVerify = await isVerify; // Renvoyer l'etat de l'abonnement dans la requete suivant
        
        next(); // Aller vers la requete suivant

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Server error: " + error });
    }
};
export default protectedRoute;