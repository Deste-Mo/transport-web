import { follow, getAllFriend, getCountFollow, unfollow } from "../models/users.js";


export const followUser = (req, res) => {

    try {

        const userId = req.user.userid;
        const { userToFollow } = req.params

        const request = follow(userToFollow, userId);

        if(!request) return res.status(400).json({error: "Erreur lors de la requete de suivre la personne"});

        return res.status(201).json({message: "Réussis"});
    } catch (error) {
        console.error("Erreur au niveau de l'envoie de requete pour suivre la personne: " + error.message);
        return res.status(500).json({error})
    }

}

export const unfollowUser = (req, res) => {

    try {

        const userId = req.user.userid;
        const { userToUnfollow } = req.params

        const request = unfollow(userToUnfollow, userId);

        if(!request) return res.status(400).json({error: "Erreur lors de la requete de retirer la personne"});

        return res.status(201).json({message: "Réussis"});
    } catch (error) {
        console.error("Erreur au niveau de l'envoie de requete pour suivre la personne: " + error.message);
        return res.status(500).json({error})
    }

}

export const allFriend = async (req, res) => {

    try {

        const userId = await req.user.userid;

        const request = await getAllFriend(userId);

        if(!request[0]) return res.status(200).json({friends: {}});

        const friends = request;

        return res.status(200).json({friends});

    } catch (error) {
        console.error("Erreur au niveau de l'envoie de requete pour suivre la personne: " + error.message);
        return res.status(500).json({error})
    }

}

export const countFollow = async (req, res) => {

    try {

        const userId = await req.user.userid;

        const request = await getCountFollow(userId);

        // return res.json(request);

        const count = request[0].number;

        return res.status(200).json({count: count});

    } catch (error) {
        console.error("Erreur au niveau de l'envoie de requete pour suivre la personne: " + error.message);
        return res.status(500).json({error})
    }

}