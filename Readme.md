##To USE
change api/config/config.js
    host: 'localhost', // host for connection
    port: 3306, // default port for mysql is 3306
    database: 'databse', // database from which we want to connect out node application
    user: 'user', // username of the mysql connection
    password: 'password' // password of the mysql connection

    replace these with respective values

create tables
1.accounts
2.Posts

accounts

+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| username | varchar(50)  | NO   |     | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |
| email    | varchar(100) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+



Posts


+-------------+----------------+------+-----+---------+----------------+
| Field       | Type           | Null | Key | Default | Extra          |
+-------------+----------------+------+-----+---------+----------------+
| title       | varchar(50)    | YES  |     | NULL    |                |
| description | varchar(10000) | YES  |     | NULL    |                |
| photo       | varchar(500)   | YES  |     | NULL    |                |
| username    | varchar(100)   | YES  |     | NULL    |                |
| categories  | varchar(50)    | YES  |     | NULL    |                |
| id          | int            | NO   | PRI | NULL    | auto_increment |
| Createdat   | date           | YES  |     | NULL    |                |
+-------------+----------------+------+-----+---------+----------------+


##To run

direct into /api and /cli
1. ***npm install***
2. ***npm start***
