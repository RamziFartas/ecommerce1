import { MongoClient } from "mongodb";

// Declare a type for the global object
declare global {
  var _mongoClientPromise: Promise<MongoClient>,
  var client: Promise<MongoClient>,
}
// ... rest of the code
