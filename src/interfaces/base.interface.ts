export interface IBase<T extends number | string> {
  _id: T;

  createdAt: Date;
  updatedAt: Date;
}