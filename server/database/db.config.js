const mongoose = require('mongoose');


const MONGO_URI = process.env.MONGO_DB_CONNECTION_URI;
const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('DataBase is connected');
    });

    await mongoose.connect(`${MONGO_URI}`);
};

module.exports = connectDB;