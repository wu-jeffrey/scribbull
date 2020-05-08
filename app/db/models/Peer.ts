import { Schema, model } from "mongoose";

const PeerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  peerId: { type: { type: "String" }, sdp: String },
  session: { type: Schema.Types.ObjectId, ref: "Session" },
});

const Peer = model("Peer", PeerSchema);

export default Peer;
