import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url)
    .then(() => console.log('Mongolino up'))
    .catch((err) => console.log('mannaggetta',err))
}

export default connectDB;