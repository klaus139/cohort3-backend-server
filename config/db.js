import mongoose from 'mongoose';

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('database connected')

    }catch(error){
        console.log('Error connecting to database');
        process.exit();
    }
}

export default connectDB;