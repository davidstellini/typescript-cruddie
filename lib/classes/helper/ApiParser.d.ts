import { Model } from "../../interfaces/model/Model";
import { List } from "./List";
export declare abstract class ApiItemParser<T extends Model> {
    Parse(response: string): T;
    ParseList(response: string): List<T>;
}
