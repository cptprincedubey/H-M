const mongoose = require('mongoose')

const connectDB = async() =>{
    try {
        const mongoUri = process.env.mongo_uri || process.env.MONGO_URI || process.env.DATABASE_URL;
        if (!mongoUri) {
            console.error("❌ MongoDB URI not found in environment variables");
            return;
        }
        
        // Check if it's a postgres URL (Replit default) and warn
        if (mongoUri.startsWith('postgres')) {
            console.warn("⚠️ Using PostgreSQL URL for MongoDB connection. This will likely fail.");
        }

        let res = await mongoose.connect(mongoUri)
        if(res){
            console.log("✅ MongoDB connected successfully")
        }
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
    }
}

module.exports = connectDB