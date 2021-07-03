import { IBase } from "./base.interface";

export interface ITax extends IBase<string> {
  name: string;
  rate: number;
  codeVAT: number;
  nameVAT: string;
  salesCodeHT: number;
  salesNameHT: string;
}