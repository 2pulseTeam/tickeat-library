import { IBase } from "./base.interface";
import { ICatalog } from "./catalog.interface";
import { ITag } from "./tag.interface";

export interface ICatalogToTag extends IBase<string> {
  position: number;

  tagId: string;

  catalogId: string;

  tag: ITag;

  catalog: ICatalog;
}