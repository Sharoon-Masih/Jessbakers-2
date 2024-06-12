import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGODB_URI;

const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDb = async () => {

    if (cached.conn) return cached.conn;

    if (!MONGO_URI) throw new Error('Db conn string is not provided');

    cached.promise = cached.promise || mongoose.connect(MONGO_URI, {
        dbName: "jess-baker-cluster",
        bufferCommands: false
    })

  cached.conn = await cached.promise
  return cached.conn;

}