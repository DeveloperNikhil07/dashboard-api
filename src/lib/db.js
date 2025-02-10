import mongoose from "mongoose";

async function connectToMongo() {
    try {
        const mongoDbUrl = process.env.MongoDbURL || "mongodb://0.0.0.0:27017/register";
        
        // Check if MongoDB URL is valid
        if (!mongoDbUrl) {
            throw new Error("MongoDbURL is not defined in environment variables or fallback.");
        }

        // Connect to MongoDB
        await mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw error;
    }
}

export default connectToMongo;
