import mongoose from "mongoose";

const DB_NAME = "family-financial-management"

const dbConnect = async()=>{
 try {
      await  mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
 } catch (error) {
    console.log("Failed to connect to database :: ", error);
 }   
}


export default  dbConnect;