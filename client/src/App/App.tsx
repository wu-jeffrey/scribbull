import React from "react";
import { Frame, CallSessionProvider } from "../foundation";
import { EditorContextProvider } from "../sections";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CallSessionProvider>
        <EditorContextProvider>
          <Frame></Frame>
        </EditorContextProvider>
      </CallSessionProvider>
    </div>
  );
}

export default App;
