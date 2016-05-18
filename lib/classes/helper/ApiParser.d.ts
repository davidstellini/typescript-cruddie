import { List } from "./List";
import { Parser } from "./Parser";
export declare class ApiParser<T> implements Parser<T> {
    Parse(objType: {
        new (): T;
    }, json: any): T;
    ParseList(objType: {
        new (): T;
    }, jsonString: string): List<T>;
}
