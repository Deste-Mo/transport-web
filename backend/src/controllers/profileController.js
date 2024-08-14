import { follow, getAllFriend, getCountFollow, unfollow, updateUser } from "../models/users.js";


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

        const profileId = await req.params.userId;

        const request = await getAllFriend(userId);

        let profileFriends = [];

        if(profileId){
            profileFriends = await getAllFriend(profileId);
        }


        let friends = {};
        let profile = {};

        friends = !request[0] ? {} : request;

        profile = !profileFriends[0] ? {} : profileFriends;

        return res.status(200).json({friends, profile});

    } catch (error) {
        console.error("Erreur au niveau de l'envoie de requete pour suivre la personne: " + error.message);
        return res.status(500).json({error: error.message})
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

export const updateProfile = async(req, res) => {

    try {
        const keys = ['profileimage','firstname','companynumber', 'phone','address', 'email','bio', 'lastname', 'usercin', 'userid']
        
        // return res.json(req.body)
        const formDate = keys.map(key =>{
            if(key === 'profileimage'){ return (req.file)? req.file.filename : null}
            if(key === 'userid') return (req.user.userid)
            return req.body[key]
        })

        
        // return res.json(formDate)

        const update = await updateUser(formDate)
        // return res.json({accountId})
        //  return res.status(200).json({update: update}) 
        return (update)? res.status(200).json({update: update}) : res.status(404).json({error: "Update error"})
        
    } catch (error) {
        console.error("Erreur au niveau de l'envoie de requete pour mettre à jour la personne: " + error.message);
        return res.status(500).json({error: error.message});
    }
}