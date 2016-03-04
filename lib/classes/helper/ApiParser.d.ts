import { List } from "./List";
export declare class ApiParser {
    static Parse<T>(objType: {
        new (): T;
    }, jsonString: string): T;
    static ParseList<T>(objType: {
        new (): T;
    }, jsonString: any): List<T>;
    static ParseUnsafe<T>(jsonString: any): T;
    static ParseListUnsafe<T>(jsonString: any): List<T>;
}
