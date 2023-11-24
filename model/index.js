import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('connected to DB')
})

export default mongoose;