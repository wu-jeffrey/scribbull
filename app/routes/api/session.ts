import * as express from "express";
import * as randomAnimalName from "random-animal-name";

import { Session, Peer } from "../../db";

export const router = express.Router();

router.get("/:sessionId", async (req, res, next) => {
  const referer = req.headers.referer;
  const sessionId = req.params.sessionId;

  const session = await Session.findOne({ _id: sessionId });

  await session
    .populate("peers")
    .execPopulate()
    .catch(next);
  session.populated("peers")[0]?.peerId;

  if (!session) {
    throw new Error("No Session Found");
  }

  res.json({
    url: `${referer}?session_id=${session._id}`,
    session: session,
  });
});

router.post("/init", async (req, res, next) => {
  const referer = req.headers.referer;

  const newPeer = {
    name: req.body.name ?? randomAnimalName(),
    peerId: req.body.peerId,
  };

  const peer = await Peer.create(newPeer);
  const session = await (await Session.create({ peers: [peer._id] }))
    .populate("peers")
    .execPopulate()
    .catch(next);

  if (!session) {
    throw new Error("No Session Found");
  }

  res.json({
    url: `${referer}?session_id=${session.id}`,
    session: session,
  });
});

router.post("/join", async (req, res, next) => {
  const referer = req.headers.referer;
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

  if (!session) {
    throw new Error("No Session Found");
  }

  res.json({
    url: `${referer}?session_id=${session.id}`,
    session: session,
  });
});
