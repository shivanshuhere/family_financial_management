import mongoose from "mongoose";

const DB_NAME = "family-financial-management";

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(
            `${process.env.MONGO_URI}/${DB_NAME}`
        );
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default dbConnect;
