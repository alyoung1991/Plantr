const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./dbConnection");

const dbRoutes = require("./routes/dbRoutes");

dotenv.config({path: '.env'});
var app = express();

app.use(bodyParser.json());

app.use("/", dbRoutes);

app.listen(process.env.PORT, () => {
    console.log(process.env.INFO);
    console.log("\tConnected to PORT " + process.env.PORT);
});