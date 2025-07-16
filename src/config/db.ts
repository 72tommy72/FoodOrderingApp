import mongoose from 'mongoose';

export const connectDB = async () => {
    return await mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {console.log( 'Connection with DB successfully') })
    .catch((err ) => {console.log(err , 'Connection with DB Faild');})
}