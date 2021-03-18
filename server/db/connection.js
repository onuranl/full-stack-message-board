const monk = require('monk');
const connectionString = process.env.PORT || 'localhost/messageboard';
const db = monk(connectionString);

module.exports = db;

