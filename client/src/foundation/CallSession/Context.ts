import React from "react";
import { IContext } from "./types";

const Context = React.createContext<IContext>({
  url: "",
  data: {},
});

export default Context;
