import React, { useState, useCallback, useRef, useEffect } from "react";
import { styles } from "./editor.style";
import { useSession } from "../../foundation";
import { Toolbox, useEditorContext } from "./components";

export function Editor() {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const { tool } = useEditorContext();
  const { data, send } = useSession();

  let mouseDown = false;
  let contextStyle = { strokeStyle: "black", lineWidth: 1 };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!context) return;
    switch (tool) {
      case "pen":
        contextStyle = { strokeStyle: "black", lineWidth: 1 };
        break;
      case "eraser":
        contextStyle = { strokeStyle: "white", lineWidth: 10 };
        break;
      case "pointer":
        contextStyle = { strokeStyle: "rgba(255, 255, 255, 0)", lineWidth: 10 };
        break;
    }
  }, [tool]);

  const onMouseDown = (e: any) => {
    mouseDown = true;
    context?.beginPath();
  };

  const onMouseMove = (e: any) => {
    const touch = e.nativeEvent instanceof TouchEvent;

    if (mouseDown && context != null) {
      const offset = getCanvasOffset();

      if (offset) {
        const x = touch ? e.touches[0].pageX : e.pageX;
        const y = touch ? e.touches[0].pageY : e.pageY;

        let endx = x - offset.x - window.scrollX;
        let endy = y - offset.y - window.scrollY;

        context.strokeStyle = contextStyle.strokeStyle;
        context.lineWidth = contextStyle.lineWidth;
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
    <>
      <Toolbox />
      <div ref={div} style={styles.Canvas}>
        <canvas
          id="Canvas"
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onMouseDown}
          onTouchMove={onMouseMove}
          onTouchEnd={onMouseUp}
        />
      </div>
    </>
  );
}
