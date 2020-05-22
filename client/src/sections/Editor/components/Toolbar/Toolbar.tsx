import React from "react";
import { useEditorContext } from "../EditorContext";
import { Button, Divider, InputNumber } from "antd";
import { MdRedo, MdUndo, MdZoomIn } from "react-icons/md";
import "./Toolbar.css";

export function Toolbar() {
  const { tool, setTool } = useEditorContext();

  return (
    <>
      <div className="Toolbar">
        <Button type="link" icon={<MdUndo />} />
        <Button type="link" icon={<MdRedo />} />
        <Divider
          type="vertical"
          style={{ background: "rgba(0, 0, 0, 0.85)" }}
        />
        <Button type="link" icon={<MdZoomIn />} />
        <InputNumber
          defaultValue={100}
          min={25}
          max={500}
          step={25}
          formatter={(value) => `${value}%`}
        />
        <Divider
          type="vertical"
          style={{ background: "rgba(0, 0, 0, 0.85)", marginLeft: 18 }}
        />
        <Button size="small" type="link">
          Clear Page
        </Button>
      </div>
    </>
  );
}
