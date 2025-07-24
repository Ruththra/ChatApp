import mongoose from 'mongoose';

//asynchronous(async) function to connect to MongoDB , it work like thread
export const connectDB = async () => {
    try {
        //await for the connection to MongoDB using the URI from environment variables
        //await wait for the connection to complete wit until continue unlike async
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
    };