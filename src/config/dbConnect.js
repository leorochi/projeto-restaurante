import mongoose, { mongo } from "mongoose";

const conectaNaDataBase = async () => {
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}

export default conectaNaDataBase;