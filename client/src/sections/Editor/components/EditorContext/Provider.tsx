import React, { useState, useRef } from "react";

import Context from "./Context";
import { IProps, Tool } from "./types";
import { useSession } from "../../../../foundation";

export function Provider({ children }: IProps) {
  const [tool, setTool] = useState<Tool>("pen");
  const lines = useRef([]);
  const redoHistory = useRef([]);

  const { send, setData } = useSession();

  const undo = () => {
    const line = lines.current.pop();

    if (line) {
      redoHistory.current.push(line);
    }

    if (setData) {
      // Need to force setter to realize its updating
      setData([...lines.current]);
    }

    if (send) {
      send([...lines.current]);
    }
  };

  const redo = () => {
    const line = redoHistory.current.pop();

    if (line) {
      lines.current.push(line);
    }

    if (setData) {
      // Need to force setter to realize its updating
      setData([...lines.current]);
    }

    if (send) {
      send([...lines.current]);
    }
  };

  return (
    <Context.Provider value={{ tool, setTool, lines, undo, redo, redoHistory }}>
      {children}
    </Context.Provider>
  );
}
