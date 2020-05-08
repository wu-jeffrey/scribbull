import React from "react";
import { Frame, CallSessionProvider } from "../foundation";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CallSessionProvider>
        <Frame></Frame>
      </CallSessionProvider>
    </div>
  );
}

export default App;
