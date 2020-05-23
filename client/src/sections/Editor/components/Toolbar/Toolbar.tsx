import React from "react";
import { Button, Divider, InputNumber } from "antd";
import { MdRedo, MdUndo, MdZoomIn } from "react-icons/md";
import "./Toolbar.css";
import { useEditorContext } from "../EditorContext";

export function Toolbar() {
  const { undo, redo } = useEditorContext();

  return (
    <>
      <div className="Toolbar">
        <Button type="link" icon={<MdUndo />} onClick={undo} />
        <Button type="link" icon={<MdRedo />} onClick={redo} />
        <Divider type="vertical" style={{ background: "#cfcfcf" }} />
        {/* <Button type="link" icon={<MdZoomIn />} />
        <InputNumber
          defaultValue={100}
          min={25}
          max={500}
          step={25}
          formatter={(value) => `${value}%`}
        />
        <Divider
          type="vertical"
          style={{ background: "#cfcfcf", marginLeft: 18 }}
        /> */}
        <Button size="small" type="link">
          Clear Page
        </Button>
      </div>
    </>
  );
}
