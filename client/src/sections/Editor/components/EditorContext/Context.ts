import React from "react";
import { IContext } from "./types";

const Context = React.createContext<IContext>({
  tool: "pen",
  setTool: () => {},
});

export default Context;
