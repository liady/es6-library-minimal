import { getLibName } from "./utils";

export default class Library {
  constructor() {
    this._name = getLibName();
  }
  get name() {
    return this._name;
  }
}