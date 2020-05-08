import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface ISession {
  peers: [];
}

const SessionSchema = new Schema<ISession>({
  peers: [{ type: Schema.Types.ObjectId, ref: "Peer" }],
});

export const Session = mongoose.model("Session", SessionSchema);
