const mysql = require('mysql');
const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: 'localhost', // host for connection
      port: 3306, // default port for mysql is 3306
      database: 'project', // database from which we want to connect out node application
      user: 'root', // username of the mysql connection
      password: '$u20hi06D3' // password of the mysql connection
    }
   
};

const connection = mysql.createConnection(config.db);

module.exports = connection;
