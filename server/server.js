const dotenv = require("dotenv");
const express = require("express");
var exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
var app = express();

// Express session middleware
app.use(session({
    secret: 'password',
    resave: true,
    saveUninitialized: true,
    // cookie: {secure: true}  //compliant clients will not send cookie back to server if browser does not have https connection
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Load config setup
dotenv.config({path: './config/.env'});
require('./config/passport')(passport);

// Backend-frontend communication middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/db", require("./routes/db"));

// Template engine
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Connect app to server port
app.listen(process.env.PORT, () => {
    console.log(process.env.INFO);
    console.log(`\tConnected to PORT ${process.env.PORT}`);
});