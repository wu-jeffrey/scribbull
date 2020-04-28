import * as Express from "express";
import * as Mongoose from "mongoose";
import { Database, httpErrorHandler } from "./app";

const PORT = process.env.PORT || 5000;
const app = Express();

// Middleware
// app.use(app.json());

// API routes

// Error Handling Middleware
app.use(httpErrorHandler);

Database.connect().then(() => {
  app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
});
