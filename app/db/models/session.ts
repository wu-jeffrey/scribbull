import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  simplePeerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Session = mongoose.model("food", SessionSchema);
