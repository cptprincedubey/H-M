const mongoose = require('mongoose')

const connectDB = async() =>{
    try {
        const mongoUri = process.env.mongo_uri || process.env.MONGO_URI;
        if (!mongoUri) {
            console.error("❌ MongoDB URI not found in environment variables");
            return;
        }
        let res = await mongoose.connect(mongoUri)
        if(res){
            console.log("✅ MongoDB connected successfully")
        }
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        console.error("   Please check your MongoDB connection string in .env file");
    }
}

module.exports = connectDB