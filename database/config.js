const mongoose = require("mongoose");
require('colors')

const dbConnection = async () => {
    try {
        await mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGODB_CNN)

        console.log('MongoDB connected'.italic.blue)
    } catch (error) {
        console.log(error)
        throw new Error('Error en la DB')
    }
};

module.exports = {
  dbConnection,
};
