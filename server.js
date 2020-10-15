const dotenv = require("dotenv");
const express = require("express");
var exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require('express-session');
const path = require('path');
var app = express();

// Express session middleware
app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: true,
    // cookie: {secure: true}  //compliant clients will not send cookie back to server if browser does not have https connection
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const dbRoutes = require("./routes/dbRoutes");

// Load config setup
dotenv.config({path: './config/.env'});
require('./config/passport')(passport);


app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

// Template engine
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');


app.listen(process.env.PORT, () => {
    console.log(process.env.INFO);
    console.log(`\tConnected to PORT ${process.env.PORT}`);
});