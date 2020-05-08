export interface IContext {
  host: IPeer;
  peer: IPeer;
  url: string;
}

export interface IProps {
  children: React.ReactNode;
}

export interface IPeer {
  name?: String;
  sdp: String;
}
