const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    password: { type: String }
});

UserSchema.index({ username: 1});


UserSchema.statics.findByName = function(name, cb){
    console.log("statics.findByName: " + name);
    return this.findOne({username : name},cb);
}

module.exports = mongoose.model('User', UserSchema);