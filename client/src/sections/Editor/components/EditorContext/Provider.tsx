import React, { useState } from "react";

import Context from "./Context";
import { IProps, Tool } from "./types";

export function Provider({ children }: IProps) {
  const [tool, setTool] = useState<Tool>("pen");

  return (
    <Context.Provider value={{ tool, setTool }}>{children}</Context.Provider>
  );
}
