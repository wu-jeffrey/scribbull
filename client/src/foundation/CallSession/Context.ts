import React from "react";
import { IContext } from "./types";

const Context = React.createContext<IContext>({
  host: { sdp: "" },
  peer: { sdp: "" },
  url: "",
});

export default Context;
