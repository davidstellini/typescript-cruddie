import {ApiItemParser} from "./ApiParser";
import {Model} from "../../interfaces/model/Model";
import {ModelFactory} from "../../interfaces/model/modelFactory";

export class DefaultApiParser<T extends Model> extends ApiItemParser<T>{
  constructor(public factory : ModelFactory<T>) {
    super();
  }
}
