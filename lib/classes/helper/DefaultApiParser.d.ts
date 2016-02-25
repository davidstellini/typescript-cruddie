import { ApiItemParser } from "./ApiParser";
import { Model } from "../../interfaces/model/Model";
import { ModelFactory } from "../../interfaces/model/modelFactory";
export declare class DefaultApiParser<T extends Model> extends ApiItemParser<T> {
    factory: ModelFactory<T>;
    constructor(factory: ModelFactory<T>);
}
