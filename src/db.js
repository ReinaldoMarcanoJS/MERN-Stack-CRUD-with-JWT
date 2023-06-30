const mongoose = require("mongoose");
const { API_URI_DB } = require('./config')
const connectDB = async () => {
    try {
        await mongoose.connect(API_URI_DB)
        console.log(">>>>> DB is connected")
    } catch (err) {
        console.log(err);
    }
}

module.exports = { connectDB }