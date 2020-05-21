import React from "react";
import { useEditorContext } from "../EditorContext";
import { Button } from "antd";
import { FaEraser, FaPen } from "react-icons/fa";
import "./Toolbox.css";

export function Toolbox() {
  const { tool, setTool } = useEditorContext();

  return (
    <>
      <div className="Container">
        <Button
          type={tool === "pen" ? "primary" : "default"}
          className="Button"
          size="large"
          shape="circle"
          icon={<FaPen />}
          onClick={() => {
            setTool("pen");
          }}
        />
        <Button
          type={tool === "eraser" ? "primary" : "default"}
          className="Button"
          size="large"
          shape="circle"
          icon={<FaEraser />}
          onClick={() => {
            setTool("eraser");
          }}
        />
      </div>
    </>
  );
}
