import { Serializable } from "./Serializable";
export declare abstract class Model extends Serializable {
    getIndex(): string;
}
export declare function indexKey(target: any, name: any): void;
