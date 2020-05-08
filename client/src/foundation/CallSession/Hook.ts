import React from "react";
import Context from "./Context";

export function useSession() {
  return React.useContext(Context);
}
