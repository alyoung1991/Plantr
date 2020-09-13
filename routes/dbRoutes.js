const express = require("express");
const Router = express.Router();

const db = require("../dbConnection");

// create table for the users owned plants
Router.get("/create", (req, res) => {
    db.query(
        "CREATE TABLE IF NOT EXISTS my_plants(" +
            "plant_id INT AUTO_INCREMENT PRIMARY KEY," +
            "plant_name VARCHAR(25) NOT NULL UNIQUE," +
            "plant_species VARCHAR(25)," +
            "plant_genus VARCHAR(25)," +
            "plant_age INT" +
        ");",
        (err, rows, fields) => {
        if (err) {
            console.log(process.env.ERROR);
            console.log("\tError retrieving data... " + err);
            return;
        }
        console.log(process.env.INFO);
        console.log("\tSuccessfully created table...");
        res.send(rows);
    });
});

// get all owned plants
Router.get("/retrieve", (req, res) => {
    db.query("SELECT * FROM my_plants", (err, rows, fields) => {
        if (err) {
            console.log(process.env.ERROR);
            console.log("\tError retrieving data... " + err);
            return;
        }
        console.log(process.env.INFO);
        console.log("\tDisplaying retrieved data... ");
        res.send(rows);
    });
});

// insert a row for new plant
Router.get("/insert", (req, res) => {
    db.query(
        "INSERT INTO my_plants (plant_name, plant_age, plant_species, plant_genus)" +
        "VALUES ('FuckMi', 91, 'FYB', 'FYS');",
    (err, rows, fields) => {
        if (err) {
            console.log(process.env.ERROR);
            console.log("\tError retrieving data... " + err);
            return;
        }
        console.log(process.env.INFO );
        console.log("\tSuccessfully added row to table...");
        res.send(rows);
    });
});

// nuclear option
Router.get("/drop", (req, res) => {
    db.query(
        "DROP TABLE my_plants",
    (err, rows, fields) => {
        if (err) {
            console.log(process.env.ERROR);
            console.log("\tError dropping table... " + err);
            return;
        }
        console.log(process.env.INFO);
        console.log("\t'Owned plants' table destroyed... ");
        res.send(rows);
    });
});

module.exports = Router;