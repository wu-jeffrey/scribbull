import * as express from "express";
import * as randomAnimalName from "random-animal-name";

import { Session, Peer } from "../../db";

export const router = express.Router();

const FRONTEND_URI = "localhost:3000";
// const FRONTEND_URI = "192.168.0.19:3000";

router.get("/:sessionId", async (req, res, next) => {
  const sessionId = req.params.sessionId;

  const session = await Session.findOne({ _id: sessionId });

  await session
    .populate("peers")
    .execPopulate()
    .catch(next);
  session.populated("peers")[0]?.peerId;

  res.json({
    url: `http://${FRONTEND_URI}?session_id=${session._id}`,
    session: session,
  });
});

router.post("/init", async (req, res, next) => {
  const newPeer = {
    name: req.body.name ?? randomAnimalName(),
    peerId: req.body.peerId,
  };

  const peer = await Peer.create(newPeer);
  const session = await (await Session.create({ peers: [peer._id] }))
    .populate("peers")
    .execPopulate()
    .catch(next);

  res.json({
    url: `http://${FRONTEND_URI}?session_id=${session.id}`,
    session: session,
  });
});

router.post("/join", async (req, res, next) => {
  const sessionId = req.body.sessionId;

  const peer = await Peer.create({
    name: req.body.name ?? randomAnimalName(),
    peerId: req.body.peerId,
  });

  const session = await (
    await Session.findByIdAndUpdate(
      sessionId,
      { $push: { peers: peer } },
      { new: true }
    )
  )
    .populate("peers")
    .execPopulate()
    .catch(next);

  res.json({
    url: `http://${FRONTEND_URI}?session_id=${session?.id}`,
    session: session,
  });
});
