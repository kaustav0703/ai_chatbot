import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase(){
    try{
        mongoose.connect(MONGODB_URI);
    }catch(err){
        console.error(err);
    }
}
export default connectToDatabase;