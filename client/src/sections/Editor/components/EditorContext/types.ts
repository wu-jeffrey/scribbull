export interface IContext {
  tool: Tool;
  setTool: Function;
  [key: string]: any;
}

export interface IProps {
  children: React.ReactNode;
}

export type Tool = "pen" | "eraser" | "pointer";
