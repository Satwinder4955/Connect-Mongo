//  naming convention for models: use singular form of the entity


// import mongoose

const mongoose = require('mongoose');

// define schema (JSON), aka blueprint for our data objects

const  dataSchemaObj = {
    name:{  type : String, required: true},
    Id: {type :String ,required:true },
    Date: {type :Date ,default: new Date() },
    course: { type:String
     }
};



// create mongoose schema

// create and importing mongoose model
