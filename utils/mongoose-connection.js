const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI) //With mongoose, communicating with db becomes easier. Connects to the correct database in MongoDB, through the link.
    .then(() => console.log("Connected to MongoDB Successfully!"))
    .catch((error) => console.log('Failed to connect to MongoDB:', error));

module.exports = mongoose.connection;