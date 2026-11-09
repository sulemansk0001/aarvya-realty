import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/aarvya_realty';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Notice] MongoDB not reachable at ${uri}.`);
    console.warn(`[MongoDB Notice] The server will continue running using in-memory / seed fallback mode.`);
    return false;
  }
};
