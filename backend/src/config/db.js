const mongoose = require('mongoose')

const connectDB = async() =>{
    const mongoUri = process.env.mongo_uri || process.env.MONGO_URI || process.env.DATABASE_URL;
    if (!mongoUri) {
        console.error("❌ MongoDB URI not found in environment variables");
        return;
    }

    // Check if it's a postgres URL (Replit default) and warn
    if (mongoUri.startsWith('postgres')) {
        console.warn("⚠️ Using PostgreSQL URL for MongoDB connection. This will likely fail.");
    }

    // simple retry loop to survive transient network hiccups in cloud hosts
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const res = await mongoose.connect(mongoUri, {
                // use new parser/timeout options for reliability
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            if (res) {
                console.log("✅ MongoDB connected successfully");
                return;
            }
        } catch (err) {
            console.error(`❌ MongoDB connection attempt ${attempt} failed:`, err.message);
            if (attempt < maxAttempts) {
                console.log(`⏳ retrying in 3s...`);
                await new Promise(r => setTimeout(r, 3000));
            } else {
                console.error('❌ All retry attempts to connect to MongoDB have failed.');
                process.exit(1);
            }
        }
    }
}

module.exports = connectDB