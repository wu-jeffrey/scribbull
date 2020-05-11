import React, { useState, useCallback, useRef, useEffect } from "react";
import "./Editor.css";

export function Editor() {
  console.log("rerender");
  const [regenerate, setRegenerate] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  let mouseDown = false;
  let x = 0;
  let y = 0;

  const canvasRef = useRef(null);
  const div = useCallback(
    (node) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
        setWidth(node.getBoundingClientRect().width);
      }
    },
    [regenerate]
  );

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      if (canvas !== null && canvas !== undefined) {
        //@ts-ignore
        setContext(canvas.getContext("2d"));
      }
    }
  }, []);

  const onMouseDown = (e: any) => {
    mouseDown = true;
    context?.beginPath();
  };

  const onMouseMove = (e: any) => {
    if (mouseDown && context != null) {
      const offset = getCanvasOffset();

      if (offset) {
        let endx = e.pageX - offset.x;
        let endy = e.pageY - offset.y;

        context.lineTo(endx, endy);
        context.stroke();
      }
    }
  };

  const onMouseUp = (e: any) => {
    mouseDown = false;
    context?.closePath();
  };

  function getCanvasOffset() {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      //@ts-ignore
      const rect = canvas.getBoundingClientRect();
      return { x: rect.left, y: rect.top };
    }
  }

  window.addEventListener("resize", () => {
    // setRegenerate(!regenerate);
  });

  return (
    <div ref={div} className="Canvas">
      <canvas
        id="Canvas"
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
    </div>
  );
}
