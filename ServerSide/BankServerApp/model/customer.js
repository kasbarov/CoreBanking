const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    ssn: { type: String },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    accounts: [{ accountNumber: String, nickName: String, balance: Number, accountType: String }]
});



module.exports = mongoose.model('Customer', CustomerSchema);