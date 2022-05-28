const mysql = require('mysql');
const config = {
    db: {
      host: 'localhost', // host for connection
      port: 3306, // default port for mysql is 3306
      database: 'databse', // database from which we want to connect out node application
      user: 'user', // username of the mysql connection
      password: 'password' // password of the mysql connection
    }
   
};

const connection = mysql.createConnection(config.db);

module.exports = connection;