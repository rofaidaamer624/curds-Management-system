const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        mongoose.set('strictQuery',false);
        const conn = await mongoose.connect(process.env.MONGO_URI); 
        console.log(`DataBase Contected :: ${conn.connection.host}`);
    } 
    catch (error) {
        console.error(error);
    }

};


module.exports = connectDB;



