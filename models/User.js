const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

var dataSchemaObj = {
    username: {type: String, required},  //username is a string that must be unique in the database.
    password: { type: String, required}   //password is also a string which will be hashed and stored in the db.
   
}

// const mongoose=require('mongoose');
// const plm= require('passport-local-mongoose');
// var dataSchemaObj={
//     username:{type:String},
//     password:{type:String}
// }
var userSchema=new mongoose.Schema(dataSchemaObj);
userSchema.plugin(plm);
module.exports=new mongoose.model('User',userSchema);