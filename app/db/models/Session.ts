import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  simplePeerId: {
    type: String,
    required: true,
  },
});

export const Session = mongoose.model("session", SessionSchema);
