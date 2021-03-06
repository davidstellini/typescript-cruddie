import { Model } from "../../interfaces/model/Model";
import { List } from "./List";
import { DataRepository } from "../../interfaces/data/DataRepository";
import { ApiRequestDecorator } from "./ApiRequestDecorator";
import { Parser } from "./Parser";
export declare abstract class ApiRepository<T extends Model> implements DataRepository<T> {
    requestDecorator: ApiRequestDecorator;
    parser: Parser<T>;
    abstract getModelType(): {
        new (): any;
    };
    getUrl(): string;
    exists(modelID: string): Promise<boolean>;
    getRange(modelIDList: List<string>): Promise<List<T>>;
    count(): number;
    findAllWith(query: string): Promise<List<T>>;
    buildReqOptions(requestType: string, url: string, model: any): any;
    buildRequestAndParseAsT<T>(url: string, requestType: string, model: T, parser: Parser<T>): Promise<T>;
    buildRequestAndParseAsTList<T extends Model>(url: string, requestType: string, model: T, parser: Parser<T>): Promise<List<T>>;
    /** Makes a request. If model is not null, it will pass it to the request
    as JSON. It will parse the response using the parser function provided,
    encapsulated in a promise. Uses default item parser. */
    buildRequestAndParseAsModel(url: string, requestType: string, model: any): Promise<T>;
    buildRequestAndParseAsModelList(url: string, requestType: string, model: any): Promise<List<T>>;
    find(modelID: string): Promise<T>;
    findAll(): Promise<List<T>>;
    addItem(modelItem: T): Promise<T>;
    removeItem(modelID: string): Promise<T>;
    saveItem(modelItem: T, modelID: string): Promise<T>;
}
