import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export async function readData(model, query = {}) {
  await dbConnect();
  return model.find(query);
}

export async function writeData(model, data) {
  await dbConnect();
  return model.create(data);
}

export async function updateData(model, id, data) {
  await dbConnect();
  return model.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteData(model, id) {
  await dbConnect();
  return model.findByIdAndDelete(id);
}

export default dbConnect;