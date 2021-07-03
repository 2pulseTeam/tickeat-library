import { IBase } from "./base.interface";

export interface IPlatform extends IBase<string> {
  name: string;
}

export enum Platforms {
  WEB = 'WEB',
  CAISSE = 'Caisse'
}