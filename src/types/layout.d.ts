export interface ILayout {
  title: string;
  description: string;
  image?: any;
}

export interface ILayoutData extends ILayout {
  _id: string;
  selected: boolean;
}
