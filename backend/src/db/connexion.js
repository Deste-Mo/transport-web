import pg from 'pg';

const Pool = pg.Pool;

const pool = new Pool({
    user: "nathan",
    password:"admin",
    host:"localhost",
    port:5432,
    database:"media_transport"
})

export default pool;