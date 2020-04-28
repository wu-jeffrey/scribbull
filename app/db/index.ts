import { Mongoose } from "mongoose";
import { config } from "node-config-ts";

const db_uri = process.env.mongoURI || config.mongoURI;

console.log(db_uri);

const mongoose = new Mongoose();
export class Database {
  static connect() {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(
          db_uri,
          { useNewUrlParser: true, useCreateIndex: true },
          (err) => {
            if (err) return reject(err);
            console.log("MongoDB connected");
            resolve();
          }
        )
        .catch((err) => console.log("Problem connecting to MongoDB: ", err));
    });
  }

  static close() {
    return mongoose.disconnect();
  }
}
