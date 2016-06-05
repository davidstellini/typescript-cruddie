import { List } from "./List";
export interface Parser<T> {
    ParseList(objType: {
        new (): T;
    }, jsonString: string): List<T>;
    Parse(objType: {
        new (): T;
    }, json: any): any;
}
