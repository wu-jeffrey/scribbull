export interface IContext {
  url: string;
  data: any;
  send?: Function | null;
}

export interface IProps {
  children: React.ReactNode;
}

export interface IPeer {
  name?: String;
  sdp: String;
}
