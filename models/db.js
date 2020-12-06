const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { mongoURI } = require('../config/keys');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
} 

module.exports = connectDB;