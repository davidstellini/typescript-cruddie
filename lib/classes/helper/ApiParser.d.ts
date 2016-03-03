import { Model } from "../../interfaces/model/Model";
import { List } from "./List";
export declare class ApiParser {
    static Parse<T extends Model>(response: string): T;
    static ParseList<T extends Model>(response: string): List<T>;
}
