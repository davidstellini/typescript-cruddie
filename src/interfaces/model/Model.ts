import {Serializable} from "./Serializable";

export abstract class Model extends Serializable   {
  //Dynamically get index based on which property was marked with
  //@indexKey annotation.
  public getIndex() : string {
    if (this['indexKey'] === undefined)
    {
        return null;
    }
    return this[this['indexKey']];
  }
}

export function indexKey(target, name) {
  target.indexKey = name;
}
