import mongoose from "mongoose"
const connectDB= async() =>{
    try {
        const connectInstance= await mongoose.connect(`${process.env.MONGODB_URL}/videotube`)
    } catch (error) {
        console.log("Mongo db connection error", error);
        process.exit(1);
    }
}

export  default connectDB