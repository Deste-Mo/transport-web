import pool from '../db/connexion.js';

// create a new offer publication, this function takes a table for this parameter and returns the inserted values

export const createOffer = async (data) => {

    var query = ""

    data.length > 7
        ?
        query = "INSERT INTO Offer( title, capacity, depart, dest, scheduledDate, description, imgUrl, userId) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning *"
        :
        query = "INSERT INTO Offer( title, capacity, depart, dest, scheduledDate, description, userId) VALUES ($1,$2,$3,$4,$5,$6,$7) returning *";

    const result = await pool.query(query,data);

    return result.rows[0];
}

// get all offer for an user (use this function to show all offers published by the user within this profil page)

export const getAllOfferById = async (userId) =>{

    const query = 'SELECT u.userId, u.firstName, u.lastName, u.phone, u.profileImage, o.offerId, o.title, o.capacity, o.depart, o.dest, o.scheduledDate, o.description, o.imgUrl, o.publicationDate, o.dispo FROM users u INNER JOIN Offer o ON u.userId = o.userId WHERE o.userId = $1 ORDER BY o.publicationDate DESC';

    const result = await pool.query(query, [userId]);

    return result.rows;
}

export const getOfferById = async (offerId) =>{

    const query = 'SELECT u.userId, u.firstName, u.lastName, u.phone, u.profileImage, o.offerId, o.title, o.capacity, o.depart, o.dest, o.scheduledDate, o.description, o.imgUrl, o.publicationDate, o.dispo FROM users u INNER JOIN Offer o ON u.userId = o.userId WHERE o.offerId = $1';

    const result = await pool.query(query, [offerId]);

    return result.rows[0];
}

// delete a offer publication for a user (used for the unset function )

export const deleteOfferById = async (offerId) =>{
    const result = await pool.query('DELETE FROM Offer WHERE offerId = $1', [offerId]);

    return result.rowCount;
}

// update the offer

export const updateOffer = async (data) => {

    const query =
        data.length > 7
            ?
            'UPDATE Offer SET title = $1, capacity =$2, depart=$3, dest=$4, scheduledDate=$5, description=$6, imgUrl=$7 WHERE offerId=$8 RETURNING *'
            :
            'UPDATE Offer SET title = $1, capacity =$2, depart=$3, dest=$4, scheduledDate=$5, description=$6 WHERE offerId=$7 RETURNING *';

    const result = await pool.query(query, data);

    return result.rows[0];
}

//Make the offer unavailable (use this for cancelling the offer publication or if a contract is established )
export const setunavailableOffer = async (offerId) =>{
    const result = await pool.query('UPDATE Offer SET dispo = FALSE WHERE offerId = $1',[offerId]);

    return result.rowCount;
}

export const setavailableOffer = async (offerId) =>{
    const result = await pool.query('UPDATE Offer SET dispo = TRUE WHERE offerId = $1',[offerId]);

    return result.rowCount;
}

//*****************************FILTER FUNCTIONS************************//

export const allAvailableOffer = async(userId) => {
    const result = await pool.query('SELECT u.userId, u.firstName, u.lastName, u.phone, u.profileImage, o.offerId, o.title, o.capacity, o.depart, o.dest, o.scheduledDate, o.description, o.imgUrl, o.publicationDate, o.dispo FROM Users u INNER JOIN Offer o ON u.userId = o.userId WHERE o.userId = $1 AND o.dispo=TRUE ORDER BY o.publicationDate DESC', [userId]);

    return result.rows;

}

export const allUnavailableOffer = async(userId) => {
    const result = await pool.query('SELECT u.userId, u.firstName, u.lastName, u.phone, u.profileImage, o.offerId, o.title, o.capacity, o.depart, o.dest, o.scheduledDate, o.description, o.imgUrl, o.publicationDate, o.dispo FROM Users u INNER JOIN Offer o ON u.userId = o.userId WHERE o.userId = $1 AND o.dispo=FALSE ORDER BY o.publicationDate DESC',[userId]);

    return result.rows;
}

export const ongoingOffer = async(userId) => {
    const result = await pool.query('SELECT u.userId, u.firstName, u.lastName, u.phone, u.profileImage, o.offerId, o.title, o.capacity, o.depart, o.dest, o.scheduledDate, o.description, o.imgUrl, o.publicationDate, o.dispo FROM Users u INNER JOIN Offer o ON u.userId = o.userId WHERE o.userId = $1 AND o.dispo=TRUE AND o.scheduledDate < (SELECT CURRENT_DATE) ORDER BY o.publicationDate DESC', [userId]);

    return result.rows;

}

export const expiredOffer = async(userId) => {
    const result = await pool.query('SELECT u.userId, u.firstName, u.lastName, u.phone, u.profileImage, o.offerId, o.title, o.capacity, o.depart, o.dest, o.scheduledDate, o.description, o.imgUrl, o.publicationDate, o.dispo FROM Users u INNER JOIN Offer o ON u.userId = o.userId WHERE o.userId = $1 AND o.scheduledDate > (SELECT CURRENT_DATE) ORDER BY o.publicationDate DESC', [userId]);

    return result.rows;

}


// get homepage offers with specified critaria( the critaria is : random offer, 50% opposite account type, 14% same account type but followed, the rest opposite account type and followed )

export const getHomepageOffers = async (userId) => {
    const query = `
        WITH CurrentUser AS (
            SELECT a.accountType 
            FROM Account a 
            INNER JOIN Users u ON u.accountId = a.accountId 
            WHERE u.userId = $1
        ), 
        OppositeAccount AS (
            SELECT o.*, u.lastName, u.firstName, u.phone, u.profileImage, a.accountType, EXISTS (SELECT 1 FROM Follow f WHERE f.followerId = $1 AND f.followeeId = u.userId) AS isfollowed 
            FROM Offer o 
            INNER JOIN Users u ON o.userId = u.userId 
            INNER JOIN Account a ON a.accountId = u.accountId 
            WHERE o.dispo = TRUE 
            AND u.userId <> $1
            AND (
                (a.accountType IN ('Camionneur') AND (SELECT accountType FROM CurrentUser) IN ('Client', 'Entreprise'))
                OR
                (a.accountType IN ('Client', 'Entreprise') AND (SELECT accountType FROM CurrentUser) IN ('Camionneur'))
            )
            ORDER BY RANDOM()
            
            LIMIT 50
        ), 
        SameAccount AS (
            SELECT o.*, u.lastName, u.firstName, u.phone, u.profileImage, a.accountType, EXISTS (SELECT 1 FROM Follow f WHERE f.followerId = $1 AND f.followeeId = u.userId) AS isfollowed 
            FROM Offer o 
            INNER JOIN Users u ON o.userId = u.userId 
            INNER JOIN Account a ON a.accountId = u.accountId 
            WHERE o.dispo = TRUE 
            AND u.userId <> $1
            
            AND a.accountType = (SELECT accountType FROM CurrentUser) 
            ORDER BY RANDOM()
            LIMIT 5 
        ), 
        SameTypeFollowedAccount AS (
            SELECT o.*, u.lastName, u.firstName, u.phone, u.profileImage, a.accountType, EXISTS (SELECT 1 FROM Follow f WHERE f.followerId = $1 AND f.followeeId = u.userId) AS isfollowed
            FROM Offer o 
            INNER JOIN Users u ON o.userId = u.userId 
            INNER JOIN Follow f ON o.userId = f.followeeId 
            INNER JOIN Account a ON u.accountId = a.accountId 
            WHERE o.dispo = TRUE
            AND u.userId <> $1 
           
            AND f.followerId = $1 
            AND a.accountType = (SELECT accountType FROM CurrentUser) 
            ORDER BY RANDOM()
            LIMIT 10 
        ), 
        OppositeFollowedAccount AS (
            SELECT o.*, u.lastName, u.firstName, u.phone, u.profileImage, a.accountType, EXISTS (SELECT 1 FROM Follow f WHERE f.followerId = $1 AND f.followeeId = u.userId) AS isfollowed 
            FROM Offer o 
            INNER JOIN Users u ON o.userId = u.userId 
            INNER JOIN Follow f ON o.userId = f.followeeId 
            INNER JOIN Account a ON u.accountId = a.accountId 
            WHERE o.dispo = TRUE 
            AND u.userId <> $1
           
            AND f.followerId = $1  
            AND (
                (a.accountType IN ('Camionneur') AND (SELECT accountType FROM CurrentUser) IN ('Client', 'Entreprise'))
                OR
                (a.accountType IN ('Client', 'Entreprise') AND (SELECT accountType FROM CurrentUser) IN ('Camionneur'))
            )
            ORDER BY RANDOM()
            LIMIT 35 
        ) 
        SELECT * FROM (
            SELECT * FROM OppositeAccount 
            UNION
            SELECT * FROM SameAccount
            UNION  
            SELECT * FROM SameTypeFollowedAccount 
            UNION 
            SELECT * FROM OppositeFollowedAccount
        ) AS CombinedOffers
        ORDER BY RANDOM()
        LIMIT 100;
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;
};

// get the latest offers published

export const latestOffers = async (userId) => {
    const query = "SELECT o.*, u.lastname, u.firstname, u.profileimage, u.phone, a.accountType FROM Offer o INNER JOIN users u ON o.userId = u.userId  INNER JOIN Account a ON u.accountId = a.accountId WHERE o.dispo = TRUE AND u.userId <> $1 ORDER BY o.publicationDate DESC"

    const result = await pool.query(query, [userId]);

    return result.rows;
}

export const allSavedOffers = async (userId) => {

    const query = "SELECT o.*, u.lastname, u.firstname, u.profileimage, u.phone, a.accountType, s.saveid, s.savedate FROM saveoffer s INNER JOIN offer o on s.offerid = o.offerid INNER JOIN users u ON u.userId = o.userId  INNER JOIN Account a ON u.accountId = a.accountId  WHERE o.dispo = TRUE AND s.userid = $1 ORDER BY o.offerid DESC"

    const result = await pool.query(query, [userId]);

    return result.rows;
}

export const setSavedOffer = async (userId, offerId) => {

    const verif = " SELECT * FROM Saveoffer WHERE offerid = $1 AND userid= $2";

    const result_0 = await pool.query(verif, [offerId, userId]);

    if(result_0.rowCount > 0){
        return null;
    }

    const query = "INSERT INTO saveoffer (offerid, userid) VALUES ($1, $2) RETURNING *";

    const result = await pool.query(query, [offerId,userId]);

    return result.rows[0];
}

export const retireSavedOffer = async (userId, offerId) => {
    const query = "DELETE FROM saveoffer WHERE offerid = $1 AND userid = $2";

    const result = await pool.query(query, [offerId,userId]);

    return result;
}

// delete all save offer for the user

export const deleteAllSaveoffer = async ( userId) =>{
    const query = "DELETE FROM Saveoffer WHERE userid = $1";

    const result = await pool.query(query, [userId]);

    return result.rowCount;
}



//get an offer by ID OFFER

export const getOfferByOfferId = async (offerId) => {

    const query = "SELECT * FROM Offer WHERE offerId = $1";

    const result = await pool.query(query, [offerId]);

    return result.rows[0];
}
