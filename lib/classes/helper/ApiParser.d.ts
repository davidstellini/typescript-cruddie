import { Model } from "../../interfaces/model/Model";
import { ModelFactory } from "../../interfaces/model/modelFactory";
import { List } from "./List";
export declare abstract class ApiItemParser<T extends Model> {
    factory: ModelFactory<T>;
    Parse(response: string): T;
    ParseList(response: string): List<T>;
}
