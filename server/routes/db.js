const express = require("express");
const mysql = require('mysql');
const Router = express.Router();

const db = require("../controllers/db");

// create table for the users owned plants
Router.post("/create", (req, res) => {
    let query = 
        "CREATE TABLE IF NOT EXISTS my_plants(" +
        "plant_id INT AUTO_INCREMENT PRIMARY KEY," +
        "plant_name VARCHAR(25) NOT NULL UNIQUE," +
        "plant_species VARCHAR(25)," +
        "plant_genus VARCHAR(25)," +
        "plant_age INT" +
    ");";
    db.queryDb(req, res, query, 'CREATE');
});

// show all owned plants
Router.get("/read", (req, res) => {
    let query = "SELECT * FROM my_plants";
    // db.queryDb(req, res, query, 'READ');
    db.query(query, (err, result) => {
        res.send(result);
    });
});

// update row data
Router.post("/update", (req, res) => {
    let query = 
        "UPDATE seed_bank.my_plants" +
        "SET plant_age = 5 " +
        "WHERE plant_id = 1;";
    db.queryDb(req, res, query, 'UPDATE')
});

// delete row from table
Router.post("/delete", (req, res) => {
    let query = 
        "DELETE FROM my_plants" +
        "WHERE plant_id = 1;";
    queryDb(req, res, query, 'DELETE');
});

// insert a row into table for new plant
Router.post("/insert", (req, res) => {
    let query = 
        "INSERT INTO my_plants (??, ??, ??, ??) " +
        "VALUES (?, ?, ?, ?);";
    let params = [
        'plant_name', 'plant_species', 'plant_genus', 'plant_age',
        db.escape('Fuqmi'), db.escape('B'), db.escape('FNB'), db.escape(10)];
    // query = mysql.format(query, params);
    // db.queryDb(req, res, query, 'INSERT');
    db.query(query, params, (err, res) => {
console.log("error: " + err);
console.log("res: " + res);
    });
});

// nuclear option
Router.post("/drop", (req, res) => {
    let query = "DROP TABLE ?";
    let params = [process.env.USER_PLANTS_DB_TBL];
    query = mysql.format(query, params);
    db.queryDb(req, res, query, 'DROP');
});

module.exports = Router;