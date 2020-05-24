import React, { useState, useCallback, useRef, useEffect } from "react";
import { styles } from "./editor.style";
import { useSession } from "../../foundation";
import { Toolbox, useEditorContext } from "./components";

interface ICoordinates {
  x: number;
  y: number;
  mode?: "begin" | "end";
}

export function Editor() {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const { tool, lines, redoHistory } = useEditorContext();
  const { data, send } = useSession();

  let mouseDown = false;
  let contextStyle = { strokeStyle: "black", lineWidth: 1 };
  let points = useRef<ICoordinates[]>([]);

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
      redrawAll(data);
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
    points.current = [];

    const { x, y } = getCoordinates(e);

    context?.moveTo(x, y);
    points.current.push({ x, y, mode: "begin" });
  };

  const onMouseMove = (e: any) => {
    if (mouseDown && context != null) {
      const offset = getCanvasOffset();

      if (offset) {
        const { x, y } = getCoordinates(e);

        context.strokeStyle = contextStyle.strokeStyle;
        context.lineWidth = contextStyle.lineWidth;
        context.lineTo(x, y);
        context.stroke();

        points.current.push({ x, y });
      }
    }
  };

  const onMouseUp = (e: any) => {
    mouseDown = false;
    context?.closePath();

    const { x, y } = getCoordinates(e);

    context?.moveTo(x, y);
    points.current.push({ x, y, mode: "end" });
    lines.current.push(points.current);

    if (send) {
      send(lines.current);
    }

    redoHistory.current = [];
  };

  const getCoordinates = (e: any): ICoordinates => {
    const offset = getCanvasOffset();
    if (!offset) return { x: 0, y: 0 };

    const touch = e.nativeEvent instanceof TouchEvent;

    const x = touch ? e.touches[0].pageX : e.pageX;
    const y = touch ? e.touches[0].pageY : e.pageY;

    return {
      x: x - offset.x - window.scrollX,
      y: y - offset.y - window.scrollY,
    };
  };

  const getCanvasOffset = () => {
    const canvas = canvasRef.current;
    if (canvas !== null) {
      //@ts-ignore
      const rect = canvas.getBoundingClientRect();
      return { x: rect.left, y: rect.top };
    }
  };

  const redrawAll = (lines: any) => {
    context?.clearRect(0, 0, width, height);

    lines.forEach((points: ICoordinates[]) => {
      points.forEach((pt: any, i: number) => {
        if (pt.mode === "begin" || points.length === 0) {
          context?.beginPath();
          context?.moveTo(pt.x, pt.y);
        }
        context?.lineTo(pt.x, pt.y);
        if (pt.mode === "end" || i === points.length - 1) {
          context?.stroke();
        }
      });
    });
  };

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
