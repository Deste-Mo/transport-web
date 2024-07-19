require('dotenv').config();

const { url } = require('inspector');
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

pool.query('SELECT NOW()', (err, res) => {
	var http = require('http');
	var fs = require('fs');
    http.createServer(function (req, res) {
		fs.readFile('index.html', function (err, data) {
	        res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			return res.end();
		})

    }).listen(8080);

    pool.end(); 
});