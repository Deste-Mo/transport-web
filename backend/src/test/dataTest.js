import pool from "../db/connexion.js";
 export const testConnection = async () => {
    try{
        const query = "INSERT INTO users (firstname,lastname,usercin,phone,address,email,bio,profileimage,accountid,subid,password, enrDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *";

        const data = [
            "nathan",
            "rael",
            "12345",
            "0346712308",
            "adress",
            "admin",
            "bio",
            "profile",
            "3", //accountId
            1,//subid
            "admin", //password
            new Date()
        ];

        const result = await pool.query(query, data);
    }catch (err){
        (`err : ${err.message}`);
    }
    
    
}
