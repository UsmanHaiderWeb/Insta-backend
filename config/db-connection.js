const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected');
    } catch (error) {
        console.log(`MONGODB CONNECTION FAILURE ERROR: ${error}`);
    }
}
connection();

module.exports = mongoose.connection;