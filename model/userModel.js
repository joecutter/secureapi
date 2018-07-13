var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//userRoll Schema
var userRollSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
	status:{
        type:String,
        required:true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }

});

var UserRoll = mongoose.model('UserRoll',userRollSchema,'userRoll');
module.exports = UserRoll;