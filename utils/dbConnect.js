import mongoose from 'mongoose';

const conexion = {};

async function dbConnect(){
    if(conexion.isConnected){
        return 

    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    conexion.isConnected = db.connections[0].readyState; 
}

export default dbConnect;