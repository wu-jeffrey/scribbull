import * as mongoose from "mongoose";
import { config } from "node-config-ts";

const db_uri = process.env.mongoURI || config.mongoURI;

export class Database {
  static connect() {
    mongoose.connect(db_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
      console.log("Connected to MongoDB");
    });
  }
}
