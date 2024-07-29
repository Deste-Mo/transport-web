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
    const result = await pool.query('SELECT u.userId, u.firstName, u.lastName, u.phone, u.profileImage, o.offerId, o.title, o.capacity, o.depart, o.dest, o.scheduledDate, o.description, o.imgUrl, o.publicationDate, o.dispo FROM Users u INNER JOIN Offer o ON u.userId = o.userId WHERE o.userId = $1 ORDER BY o.publicationDate DESC', [userId]);

    return result.rows;
}

// delete a offer publication for a user (used for the unset function )

export const deleteOfferById = async (offerId) =>{
    const result = await pool.query('DELETE FROM Offer WHERE offerId = $1', [offerId]);

    return result.rowCount;
}

// update the offer

export const updateOffer = async (data) => {
    const result = await pool.query('UPDATE Offer SET title = $1, capacity =$2, depart=$3, dest=$4, scheduledDate=$5, description=$6, imgUrl=$7, dispo=TRUE WHERE offerId=$8', data);

    return result.rowCount;
}

//Make the offer unavailable (use this for cancelling the offer publication or if a contract is established )
export const setunavailableOffer = async (offerId) =>{
    const result = await pool.query('UPDATE Offer SET dispo = FALSE WHERE offerId = $1',[offerId]);

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

    // const todaydate = new Date();    
  
    const query = `
              WITH CurrentUser AS (
                  SELECT a.accountType 
                  FROM Account a 
                  JOIN Users u ON u.accountId = a.accountId 
                  WHERE u.userId = $1
              ), 
              OppositeOffers AS (
                  SELECT o.*, u.lastName, u.firstName, u.phone, u.profileImage, a.accountType 
                  FROM Offer o 
                  JOIN Users u ON o.userId = u.userId 
                  JOIN Account a ON a.accountId = u.accountId 
                  WHERE o.dispo = TRUE 
                  AND u.userId <> $1
                  AND o.scheduledDate >= current_date 
                  AND (
                      (a.accountType IN ('Camionneur') AND (SELECT accountType FROM CurrentUser) IN ('Client', 'Entreprise'))
                      OR
                      (a.accountType IN ('Client', 'Entreprise') AND (SELECT accountType FROM CurrentUser) IN ('Camionneur'))
                  )
                  ORDER BY RANDOM() 
                  LIMIT 50
              ), 
              SameTypeFollowedOffers AS (
                  SELECT o.*, u.lastName, u.firstName, u.phone, u.profileImage, a.accountType 
                  FROM Offer o 
                  JOIN Users u ON o.userId = u.userId 
                  JOIN Follow f ON u.userId = f.followeeId 
                  JOIN Account a ON u.accountId = a.accountId 
                  WHERE o.dispo = TRUE
                  AND u.userId <> $1 
                  AND o.scheduledDate >= current_date 
                  AND f.followerId = $1 
                  AND a.accountType = (SELECT accountType FROM CurrentUser) 
                  ORDER BY RANDOM() 
                  LIMIT 15
              ), 
              OppositeFollowedOffers AS (
                  SELECT o.*, u.lastName, u.firstName, u.phone, u.profileImage, a.accountType 
                  FROM Offer o 
                  JOIN Users u ON o.userId = u.userId 
                  JOIN Follow f ON u.userId = f.followeeId 
                  JOIN Account a ON u.accountId = a.accountId 
                  WHERE o.dispo = TRUE 
                  AND u.userId <> $1
                  AND o.scheduledDate >= current_date 
                  AND f.followerId = $1  
                  AND (
                      (a.accountType IN ('Camionneur') AND (SELECT accountType FROM CurrentUser) IN ('Client', 'Entreprise'))
                      OR
                      (a.accountType IN ('Client', 'Entreprise') AND (SELECT accountType FROM CurrentUser) IN ('Camionneur'))
                  )
                  ORDER BY RANDOM() 
                  LIMIT 35
              ) 
              SELECT * FROM OppositeOffers 
              UNION  
              SELECT * FROM SameTypeFollowedOffers 
              UNION 
              SELECT * FROM OppositeFollowedOffers;
          `;
  
          const result = await pool.query(query, [userId]);
  
  
      return result.rows;
  }

// get the latest offers published

export const latestOffers = async (userId) => {
    const query = "SELECT o.*, u.lastname, u.firstname, u.profileimage, u.phone, a.accountType FROM Offer o INNER JOIN users u ON o.userId = u.userId  INNER JOIN Account a ON u.accountId = a.accountId WHERE o.dispo = TRUE AND u.userId <> $1 ORDER BY o.offerid DESC"

    const result = await pool.query(query, [userId]);

    return result.rows;
}



//get an offer by ID OFFER

export const getOfferByOfferId = async (offerId) => {

    const query = "SELECT * FROM Offer WHERE offerId = $1";

    const result = await pool.query(query, [offerId]);

    return result.rows[0];
}
