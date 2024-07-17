// backend/src/controllers/usersController.js

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Récupérer tous les utilisateurs
const getUsersByType = async (req, res) => {
    const { accountType } = req.params; // Paramètre de type de compte (Client, Camionneur, Entreprise)
    try {
        const query = `
            SELECT * FROM Users
            WHERE accountId IN (
                SELECT accountId FROM Account WHERE accountType = $1
            )
        `;
        const { rows } = await pool.query(query, [accountType]);
        res.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
};

module.exports = {
    getUsersByType,
};