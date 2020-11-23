const pg = require('pg');

// get the Pool object from pg
const Pool = pg.Pool;
// Make our own instance of the Pool from that template Pool object.
let config = {}

if (process.env.DATABASE_URL){
    // running remote (heroku).
    config = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }

} else {
    // running local
    config = {
        database: 'weekend-to-do-app', // This will always change based on the db name
        host: 'localhost', // connect to our computer
        port: '5432', // default port number
        max: 10, // max number of connections
        idleTimeoutMillis: 30000 // 30 seconds
    };
}

// create the pool
const pool = new Pool(config);

// When we connect to the database, run a function
pool.on('connect', () => {
    console.log(`Connected to database`);
})

// handling if we get an error from pg
pool.on('error', (error) => {
    console.log('Error from pg', error);
})
module.exports = pool;