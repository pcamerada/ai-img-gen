import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
    .then(() => console.log('MongoDB up'))
    .catch((err) => console.log('DB Connection Error ::',err))
}

export default connectDB;