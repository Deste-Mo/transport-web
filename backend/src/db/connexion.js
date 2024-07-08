import pg from 'pg';

const Pool = pg.Pool;

const pool = new Pool({
    user: "alexis",
    password:"al104al1x6s",
    host:"localhost",
    port:5432,
    database:"media_transport"
})

export default pool;