const db = require('../controllers/db');

const UserSchema = {
    id: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    findById(id) {
        let query = 
            `SELECT * ` +
            `FROM seed_bank.users ` +
            `WHERE id=${id};`;
        let user = db.queryDb(null, null, query, 'READ');
console.log("User.id: " + id);        
console.log("User.findById: " + user);
    }
};

module.exports = UserSchema;