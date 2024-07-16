import pg from 'pg';

const Pool = pg.Pool;

const pool = new Pool({
    user: 'Modeste',
    host: 'localhost',
    database: 'media_transport',
    password: 'modeste',
    port: 5432,
});

export default pool;