// var fs = require("fs");
// var file = "test.db";
// var exists = fs.existsSync(file);
//
// var sqlite3 = require("sqlite3").verbose();
// var db = new sqlite3.Database(file);
//
//
// db.serialize(function() {
//   if(!exists) {
//     db.run("CREATE TABLE Stuff (thing TEXT)");
//     console.log("table created");
//   }
// });

var mysql  = require('mysql');
var express = require('express');


// $dbhost = 'localhost:3036';
// $dbuser = 'root';
// $dbpass = 'rootpassword';
// $conn = mysql_connect($dbhost, $dbuser, $dbpass);
// if(! $conn )
// {
//   die('Could not connect: ' . mysql_error());
// }
// echo 'Connected successfully<br />';
// $sql = 'CREATE DATABASE TUTORIALS';
// $retval = mysql_query( $sql, $conn );
//

var databaseName = 'pgt1';
var app = express();

var dbconn = mysql.createConnection({
  host     : 'localhost',
  // port     : '3308',
  user     : 'root',
  password : 'root',
  database : databaseName
});

dbconn.connect(function(err){
  if(err){
    console.log('Database connection error\n' + err);
    var mess = 'Error: ER_BAD_DB_ERROR: Unknown database' + ' ' + '\'' + databaseName + '\'';
    if (err == mess) {
      console.log('messages are equal to each other');
//TODO CREATE DB
// if err  == "ER_BAD_DB_ERROR: Unknown database" + dbConn.database {
  // var dbconn = mysql.createConnection({
  //   host     : 'localhost',
  //   // port     : '3308',
  //   user     : 'root',
  //   password : 'root',
  // });

    }
    //TODO Handle connection error and some other errors
  }
  else{
    console.log('Database connection successful');
  }
});

dbconn.end(function(err) {
  // Function to close database connection
});
