import { Model } from "../../interfaces/model/Model";
import { List } from "./List";
import { DataRepository } from "../../interfaces/data/DataRepository";
export declare abstract class ApiRepository<T extends Model> implements DataRepository<T> {
    abstract getModelType(): {
        new (): any;
    };
    abstract getUrl(): string;
    exists(modelID: string): Promise<boolean>;
    getRange(modelIDList: List<string>): Promise<List<T>>;
    count(): number;
    buildReqOptions(requestType: string, url: string, model: any): any;
    buildRequestAndParseAsT<T extends Model>(url: string, requestType: string, model: T): Promise<T>;
    buildRequestAndParseAsTList<T extends Model>(url: string, requestType: string, model: T): Promise<List<T>>;
    buildRequestAndParseAsModel(url: string, requestType: string, model: any): Promise<T>;
    buildRequestAndParseAsModelList(url: string, requestType: string, model: any): Promise<List<T>>;
    getItem(modelID: string): Promise<T>;
    getAllItems(): Promise<List<T>>;
    addItem(modelItem: T): Promise<T>;
    removeItem(emptyModelWithID: T): Promise<T>;
    saveItem(modelItem: T): Promise<T>;
}
