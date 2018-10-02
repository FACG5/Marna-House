const { Pool } = require('pg');
const url = require('url');
require('env2')('config.env');

let DB_URL = process.env.DB_URL;

if (process.env.NODE_ENV) {
    DB_URL = process.env.TEST_DB_URL;
};

if (!DB_URL) {
    throw new TypeError('Where is DB_URL');
};

const params = url.parse(DB_URL);
const [username, password] = params.auth.split(':');

const options = {
    host: params.hostname,
    port: params.port,
    user: username,
    password,
    database: params.pathname.split('/')[1],
    ssl: process.env.hostname !== 'localhost',
    max: process.env.MAX_CONNECTIONS || 2,
};

module.exports = new Pool(options);
