const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config({path: '../config/.env'});

var db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

db.connect((err) => {
    if (!err) {
        console.log(process.env.INFO);
        console.log("\tConnected to database...");
    }
    else {
        console.log(process.env.ERROR);
        console.log("\tFailed to connect to database... " + err);
    }
});

// utility function for querying db and error handling
db.queryDb = (req, res, query, command) => {
console.log("querying db...");
    db.query(
        query,
        (err, rows, fields) => {
            if (err) {
                logDebug('ERROR', command, err);
                return;
            }
            logDebug('INFO', command, err);
            console.log(JSON.stringify(rows));
        }
    );
};

// print status reports formatted for console
function logDebug(status, command, err) {
    // error reporting
    if (err) {
        switch(command) {
            case 'CREATE':
                console.log(process.env.ERROR);
                console.error(`\tError creating data... ${err}`);
                break;
            case 'READ':
                console.log(process.env.ERROR);
                console.error(`\tError retrieving data... ${err}`);
                break;
            case 'UPDATE':
                console.log(process.env.ERROR);
                console.error(`\tError updating data... ${err}`);
                break;
            case 'DELETE':
                console.log(process.env.ERROR);
                console.error(`\tError deleting data... ${err}`);
                break;
            case 'INSERT':
                console.log(process.env.ERROR);
                console.error(`\tError inserting data... ${err}`);
                break;
            case 'DROP':
                console.log(process.env.ERROR);
                console.error(`\tError dropping table... ${err}`);
                break;
            default:
                console.log("No usable case for status, command in logDebug().");
                console.log(`Given status: ${status}, command: ${command}`);
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

module.exports = db;