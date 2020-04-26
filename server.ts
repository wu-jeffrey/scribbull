import * as Express from "express";
import * as Mongoose from "mongoose";
import * as Peer from "simple-peer";

const app = Express();

const server = app.listen(5000, () => {
  console.log("server is running on port", server.address().port);
});
