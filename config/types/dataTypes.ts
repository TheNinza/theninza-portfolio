export interface IStack {
  id: string;
  name: string;
  image: {
    url: string;
    fileName: string;
  };
}

export interface IApplication {
  id: string;
  name: string;
  description: string;
  image: {
    url: string;
    fileName: string;
  };
  liveUrl: string;
  sourceCodeUrl: string;
  stacks: IStack[];
}
