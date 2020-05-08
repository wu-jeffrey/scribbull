import React, { useMemo, useState } from "react";
import Peer from "simple-peer";
import { default as axios } from "axios";

import Context from "./Context";
import { IProps } from "./types";

export function Provider({ children }: IProps) {
  let host = { sdp: "" };
  let peer = { sdp: "" };
  const [url, setUrl] = useState("");

  const initiator = Boolean(window.location.hash === "#init");
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");

  function send() {}

  useMemo(() => {
    const p = new Peer({
      initiator,
      trickle: false,
    });

    if (sessionId) {
      (async () => {
        const response = await axios.get(`/api/sessions/${sessionId}`);
        const { session } = response.data;
        const { peerId: hostId } = session.peers[0];
        p.signal(hostId);
      })();
    }

    p.on("signal", (data: any) => {
      console.log("signalled");
      if (initiator) {
        (async () => {
          const response = await axios.post(`/api/sessions/init`, {
            peerId: data,
          });
          setUrl(response.data.url);

          // Poll constantly for answering peers until one is found
          const interval = setInterval(async function() {
            const poll_response = await axios.get(
              `/api/sessions/${response.data.session._id}`
            );
            const { session } = poll_response.data;
            console.log("polling", session.peers);
            if (session.peers.length > 1) {
              p.signal(session.peers[1].peerId);
              clearInterval(interval);
            }
          }, 5000);
        })();
      } else {
        (async () => {
          const response = await axios.post(`/api/sessions/join`, {
            peerId: data,
            sessionId: sessionId,
          });
        })();
      }
    });

    p.on("connect", (data: any) => {
      console.log("connected", data);
    });
  }, []);

  return (
    <Context.Provider value={{ host, peer, url }}>{children}</Context.Provider>
  );
}