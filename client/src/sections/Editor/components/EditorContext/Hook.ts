import React from "react";
import Context from "./Context";

export function useEditorContext() {
  return React.useContext(Context);
}
