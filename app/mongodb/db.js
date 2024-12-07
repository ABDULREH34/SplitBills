import { MongoClient } from 'mongodb';

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the MongoDB client is not created multiple times
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(process.env.NEXT_PUBLIC_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function connectToDatabase() {
  if (!client) {
    client = await clientPromise;
  }
  const db = client.db(); 
  return { client, db };
}
