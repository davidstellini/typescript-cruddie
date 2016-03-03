import { Serializable } from "./Serializable";
import { ModelFactory } from "./modelFactory";
export declare abstract class Model extends Serializable implements ModelFactory<Model> {
    abstract create(): Model;
    getIndex(): string;
}
export declare function indexKey(target: any, name: any): void;
