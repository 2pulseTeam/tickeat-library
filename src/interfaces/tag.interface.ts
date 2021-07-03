import { IBase } from "./base.interface";

export interface ITag extends IBase<string> {
  name: string;

  parent: ITag;

  color: string;

  description: string;

  imageUrl: string;

  slug: string;

  position: number;
}