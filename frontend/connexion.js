// Importer dotenv pour charger les variables d'environnement à partir de .env
require('dotenv').config();

// Importer le module pg pour la connexion PostgreSQL
const { Pool } = require('pg');

// Configurer la connexion PostgreSQL en utilisant les variables d'environnement chargées
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

// Tester la connexion en exécutant une requête simple
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erreur lors de la connexion à PostgreSQL', err);
    } else {
        console.log('Connexion à PostgreSQL établie avec succès.');
        console.log('La date courante est :', res.rows[0].now);
    }
    pool.end(); // Terminer la connexion lorsque vous avez fini
});
