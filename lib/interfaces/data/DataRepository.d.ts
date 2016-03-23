import { Model } from "../model/Model";
import { List } from "../../classes/helper/List";
import { Promise } from "es6-promise";
export interface DataRepository<T extends Model> {
    getModelType(): {
        new (): any;
    };
    getItem(modelID: string): Promise<T>;
    exists(modelID: string): Promise<boolean>;
    getAllItems(): Promise<List<T>>;
    getRange(modelIDList: List<string>): Promise<List<T>>;
    count(): number;
    addItem(modelItem: T): Promise<T>;
    removeItem(modelID: string): Promise<T>;
    saveItem(modelItem: T): Promise<T>;
}
