
import dotenv from "dotenv"
import connectDB from "./db/dbConnect.js"
import express from "express"

const app = express();

dotenv.config({
    path: "./.env"
})

try {
    
   await connectDB();

   app.on("error",(error)=>{
    console.log("Error", error);
    throw error;
   })

   app.listen(process.env.PORT,()=>{
    console.log(`Server is running at PORT ${process.env.PORT}`);
   })

} catch (error) {
    console.log("Mongo db connection error",error);
}