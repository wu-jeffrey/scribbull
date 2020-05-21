export interface IContext {
  tool: Tool;
  setTool: Function;
}

export interface IProps {
  children: React.ReactNode;
}

export type Tool = "pen" | "eraser" | "pointer";
