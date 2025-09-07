import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose
    .connect(process.env.DB_URL as string)
    .then(() => {
        console.log('Connected to DB');
    }).catch((err) => {
        console.log("Error connecting to DB", err);
    })
}