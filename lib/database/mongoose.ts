import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Declare the global variable `mongoose` correctly with `const`
declare global {
  var mongoose: MongooseConnection | undefined;
}

// Use `let` for `cached` to allow future reassignment, but `const` would work here since it’s not reassigned
const cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

if (!cached.conn) {
  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = mongoose.connect(MONGODB_URL, { dbName: 'imaginify', bufferCommands: false })
    .then(mongooseInstance => mongooseInstance);

  cached.conn = await cached.promise;
  global.mongoose = cached; // Cache the connection globally
}

export const connectToDatabase = async () => {
  return cached.conn;
};
