require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erreur lors de la connexion à PostgreSQL', err);
    } else {
        console.log('Connexion à PostgreSQL établie avec succès.');
        console.log('La date courante est :', res.rows[0].now);
    }
    pool.end(); 
});

// backend/src/db/.env
// backend/src/db/connexion.js
// backend/src/routes/friendsRouter.js
// frontend/src/pages/Parametre/Social/friend/FriendOption.jsx