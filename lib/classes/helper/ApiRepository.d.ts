import { Model } from "../../interfaces/model/Model";
import { List } from "./List";
import { DataRepository } from "../../interfaces/data/DataRepository";
import { Promise } from "es6-promise";
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
    /** Makes a request. If model is not null, it will pass it to the request
    as JSON. It will parse the response using the parser function provided,
    encapsulated in a promise. Uses default item parser. */
    buildRequestAndParseAsModel(url: string, requestType: string, model: any): Promise<T>;
    buildRequestAndParseAsModelList(url: string, requestType: string, model: any): Promise<List<T>>;
    getItem(modelID: string): Promise<T>;
    getAllItems(): Promise<List<T>>;
    addItem(modelItem: T): Promise<T>;
    removeItem(modelID: string): Promise<T>;
    saveItem(modelItem: T): Promise<T>;
}
