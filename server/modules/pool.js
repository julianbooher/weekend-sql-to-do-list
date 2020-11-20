const pg = require('pg');

// get the Pool object from pg
const Pool = pg.Pool;
// Make our own instance of the Pool from that template Pool object.
const pool = new Pool({
    database: 'weekend-to-do-app', // This will always change based on the db name
    host: 'localhost', // connect to our computer
    port: '5432', // default port number
    max: 10, // max number of connections
    idleTimeoutMillis: 30000 // 30 seconds
});

// When we connect to the database, run a function
pool.on('connect', () => {
    console.log(`Connected to database`);
})

// handling if we get an error from pg
pool.on('error', (error) => {
    console.log('Error from pg', error);
})
module.exports = pool;