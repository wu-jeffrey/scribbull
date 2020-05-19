import React, { useState, useCallback, useRef, useEffect } from "react";
import { styles } from "./editor.style";
import { useSession } from "../../foundation";

export function Editor() {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const { data, send } = useSession();

  let mouseDown = false;

  const canvasRef = useRef(null);
  const div = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      if (canvas !== null && canvas !== undefined) {
        //@ts-ignore
        setContext(canvas.getContext("2d"));
      }
    }
  }, []);

  useEffect(() => {
    if (data && context) {
      const image = new Image();

      image.addEventListener("load", () => {
        context.drawImage(image, 0, 0);
      });

      //@ts-ignore
      image.src = data.image;
    }
  }, [data]);

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

    //@ts-ignore
    var canvasContents = canvasRef?.current?.toDataURL();
    var data = { image: canvasContents, date: Date.now() };
    var string = JSON.stringify(data);
    if (send) {
      send(string);
    }
  };

  function getCanvasOffset() {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      //@ts-ignore
      const rect = canvas.getBoundingClientRect();
      return { x: rect.left, y: rect.top };
    }
  }

  return (
    <div ref={div} style={styles.Canvas}>
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
