import mongoose from "mongoose";
export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connect Sucessfully");
    }
    catch(error){
        console.error("DB not connect");
        process.exit(1);
    }
}