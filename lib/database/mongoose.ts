import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseConnection | undefined;
}

let cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

if (!cached.conn) {
  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = mongoose.connect(MONGODB_URL, { dbName: 'imaginify', bufferCommands: false })
    .then(mongooseInstance => mongooseInstance);

  cached.conn = await cached.promise;
  global.mongoose = cached;
}

export const connectToDatabase = async () => {
  return cached.conn;
};
