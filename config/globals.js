const mongoose = require('mongoose');


const mongoURI = {
  'db': 'mongodb+srv://user4512:comp2068@cluster0.fgk9ofi.mongodb.net/projectTrackerApplication'
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
 
  
});

const db = mongoose.connection;
// Event handlers for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB Atlas connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas successfully');
});
require('../models/project');
// Export the database connection
module.exports = db;