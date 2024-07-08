import bcryptjs from 'bcryptjs';
import pool from "../db/connexion.js";
import generateToken from '../utils/jwtGenerator.js';

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
        } = req.body;

        const profile = "X.jpg";

        var data = [];

        var query = "";

        // Verifie si les champs sont vide
        if (!firstname || !password || !confirmPassword || !phone || !adress || !accountid) {
            return res.status(400).json({ error: "Completer tous les champs s'il vous plait" });
        }

        if (accountid == 1 || accountid == 3) {
            if (!usercin) {
                return res.status(400).json({ error: "Completer tous les champs s'il vous plait" });
            }

            query = "INSERT INTO users (firstname,lastname,usercin,phone,address,email,bio,profileimage,accountid,password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";

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

        } else if (accountid == 2) {
            if (!companynumber || !email) {
                return res.status(400).json({ error: "Completer tous les champs s'il vous plait" });
            }

            query = "INSERT INTO users (firstname,companynumber,phone,address,email,bio,profileimage,accountid,password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";

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
            return res.status(400).json({ error: "Mots de passe ne correspond pas" });
        }

        // Verifier si l'utilisateur existe deja dans la base de donnees
        const user = await pool.query("SELECT * FROM users WHERE email = $1 or phone = $2", [email, phone]);
        if (user.rowCount > 0) {
            return res.status(400).json({ error: "L'utilisateur existe Dejas" });
        }

        // Crypter le mots de passe
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        data.push(hashedPassword);

        const createUsers = await pool.query(query, data);

        if (createUsers) {
            // generer un token
            const newUsers = createUsers.rows[0];

            const token = generateToken(newUsers.id, res);


            return res.json({ token });

        } else {
            return res.status(400).json({ error: "Donnee incoherents" });
        }

    } catch (error) {
        console.log("Erreur au niveau du signupController: ", error.message)
        return res.status(500).send("Server error: " + error.message);
    }
};

export const login = async (req, res) => {
    try {

        // prend les information sur le client
        const { email, password } = req.body;

        // Verifier si l'email/telephone existe et que le password correspond
        const userExist = await pool.query("SELECT * from users WHERE email = $1 or phone = $2", [email, email]);

        if (!userExist.rows[0]) {// utilisateur n'existe pas
            return res.status(500).json({ error: "L'utilisateur n'existe pas" });
        }

        const users = userExist.rows[0];

        const isCorrectPassword = await bcryptjs.compare(password,users.password);

        if (!isCorrectPassword) {
            return res.status(500).json({ error: "Mots de passe incorrect" });
        }

        const token = generateToken(users.userid, res);

        return res.json({ token });

    } catch (error) {
        console.log(error)
        return res.status(500).send("Server error: " + error.message);
    }
};

export const getMe = async (req, res) => {

    try {

        const user = req.user;

        if (!user) {
            return res.status(500).json({ error: "L'utilisateur existe pas" });
        }

        console.log(user)

        let fullname = "";

        if(!user.lastname){
            fullname = user.firstname;
        }else{
            fullname = user.firstname + " " + user.lastname;
        }

        return res.status(200).json({
            id: user.userid,
            fullName: fullname,
            accounttype: user.accounttype
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send("Server error: " + error);
    }

}
