import { List } from "./List";
export declare class ApiParser {
    static Parse<T>(objType: {
        new (): T;
    }, json: any): T;
    static ParseList<T>(objType: {
        new (): T;
    }, json: any): List<T>;
    static ParseUnsafe<T>(jsonString: string): T;
    static ParseListUnsafe<T>(jsonString: string): List<T>;
}
