import { follow, getAllFriend, getCountFollow, getIfUserExist, getUser, getUserUpdate, unfollow, updateUser } from "../models/users.js";


export const followUser = (req, res) => {

    try {

        const userId = req.user.userid;
        const { userToFollow } = req.params

        const request = follow(userToFollow, userId);

        if(!request) return res.status(400).json({error: "Erreur lors de la requête de suivie de la personne"});

        return res.status(201).json({message: "Réussis"});
    } catch (error) {
        console.error("Erreur au niveau de l'envoie de requête pour suivre la personne: " + error.message);
        return res.status(500).json({error})
    }

}

export const unfollowUser = (req, res) => {

    try {

        const userId = req.user.userid;
        const { userToUnfollow } = req.params

        const request = unfollow(userToUnfollow, userId);

        if(!request) return res.status(400).json({error: "Erreur lors de la requête de retention de la personne"});

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
        console.error("Erreur au niveau de l'envoie de requête pour suivre la personne: " + error.message);
        return res.status(500).json({error: error.message})
    }

}

export const getUserExistId = async (req, res) => {

    const profileId = await req.params.userId;

    const answer = await getIfUserExist(profileId);

    return res.status(200).json({exist: (answer == 1 )});
    
}

export const countFollow = async (req, res) => {

    try {

        const userId = await req.user.userid;

        const request = await getCountFollow(userId);

        // return res.json(request);

        const count = request[0].number;

        return res.status(200).json({count: count});

    } catch (error) {
        console.error("Erreur au niveau de l'envoie de requête pour suivre la personne: " + error.message);
        return res.status(500).json({error})
    }

}

export const updateProfile = async(req, res) => {

    try {
        const keys = ['profileimage','firstname','companynumber', 'phone','address', 'email','bio', 'lastname', 'usercin', 'userid']
        
        const formDate = keys.map(key =>{
            if(key === 'profileimage'){ return (req.file)? req.file.filename : null}
            if(key === 'userid') return (req.user.userid)
            return req.body[key]
        })

        const user = await getUserUpdate(req.body?.email, req.body.usercin ? req.body.usercin : req.body.companynumber, req.body?.phone, req.user?.userid);

        console.log({user});

        if (user.length > 0) {
            return res.status(400).json({error: "L'utilisateur existe Déjas"});
        }

        const update = await updateUser(formDate)
       
        return (update)? res.status(200).json({update: update}) : res.status(404).json({error: "Update error"})
        
    } catch (error) {
        console.error("Erreur au niveau de l'envoie de requête pour mettre à jour la personne: " + error.message);
        return res.status(500).json({error: error.message});
    }
}