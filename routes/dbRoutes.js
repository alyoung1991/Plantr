const express = require("express");
const Router = express.Router();

const db = require("../dbConnection");

// create table for the users owned plants
Router.get("/create", (req, res) => {
    let query = 
        "CREATE TABLE IF NOT EXISTS my_plants(" +
        "plant_id INT AUTO_INCREMENT PRIMARY KEY," +
        "plant_name VARCHAR(25) NOT NULL UNIQUE," +
        "plant_species VARCHAR(25)," +
        "plant_genus VARCHAR(25)," +
        "plant_age INT" +
    ");";
    queryDb(req, res, query, 'CREATE');
});

// show all owned plants
Router.get("/read", (req, res) => {
    let query = "SELECT * FROM my_plants";
    queryDb(req, res, query, 'READ');
});

// update row data
Router.get("/update", (req, res) => {
    let query = 
        "UPDATE seed_bank.my_plants" +
        "SET plant_age = 5 " +
        "WHERE plant_id = 1;";
    queryDb(req, res, query, 'UPDATE')
});

// delete row from table
Router.get("/delete", (req, res) => {
    let query = 
        "DELETE FROM my_plants" +
        "WHERE plant_id = 1;";
    queryDb(req, res, query, 'DELETE');
});

// insert a row into table for new plant
Router.get("/insert", (req, res) => {
    let query = 
        "INSERT INTO my_plants (plant_name, plant_genus, plant_species, plant_age)" +
        "VALUES ('Fuquo', 'B', 'FNB', 10);";
    queryDb(req, res, query, 'INSERT');
});

// nuclear option
Router.get("/drop", (req, res) => {
    let query = "DROP TABLE my_plants";
    queryDb(req, res, query, 'DROP');
});

// utility function for querying db and error handling
function queryDb(req, res, query, command) {
    db.query(
        query,
    (err, rows, fields) => {
        if (err) {
            logDebug('ERROR', command, err);
            return;
        }
        logDebug('INFO', command, err);
        res.send(rows);
    });
}

// print status reports formatted for console
function logDebug(status, command, err) {
    // error reporting
    if (err) {
        switch(command) {
            case 'CREATE':
                console.log(process.env.ERROR);
                console.log(`\tError creating data... ${err}`);
                break;
            case 'READ':
                console.log(process.env.ERROR);
                console.log(`\tError retrieving data... ${err}`);
                break;
            case 'UPDATE':
                console.log(process.env.ERROR);
                console.log(`\tError updating data... ${err}`);
                break;
            case 'DELETE':
                console.log(process.env.ERROR);
                console.log(`\tError deleting data... ${err}`);
                break;
            case 'INSERT':
                console.log(process.env.ERROR);
                console.log(`\tError inserting data... ${err}`);
                break;
            case 'DROP':
                console.log(process.env.ERROR);
                console.log(`\tError dropping table... ${err}`);
                break;
        }
    }
    // success confirmation
    else {
        switch(command) {
            case 'CREATE':
                console.log(process.env.INFO);
                console.log("\tSuccessfully created table...");
                break;
            case 'READ':
                console.log(process.env.INFO);
                console.log("\tDisplaying retrieved data... ");
                break;
            case 'UPDATE':
                console.log(process.env.INFO );
                console.log("\tSuccessfully updated row in table...");
                break;
            case 'DELETE':
                console.log(process.env.INFO );
                console.log("\tSuccessfully deleted row in table...");
                break;
            case 'INSERT':
                console.log(process.env.INFO );
                console.log("\tSuccessfully added row to table...");
                break;
            case 'DROP':
                console.log(process.env.INFO);
                console.log("\t'Owned plants' table destroyed... ");
                break;
            default:
                console.log("No usable case for status, command in logDebug().");
                console.log(`Given status: ${status}, command: ${command}`);
        }
    }
}

module.exports = Router;