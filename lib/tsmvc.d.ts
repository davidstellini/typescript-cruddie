declare module "interfaces/model/Serializable" {
    export abstract class Serializable {
        FromJson(obj: any): void;
        Stringify(): string;
        parse<T extends Serializable>(string: string): T;
    }
}
declare module "interfaces/model/modelFactory" {
    import { Model } from "interfaces/model/Model";
    export interface ModelFactory<T extends Model> {
        create(): T;
    }
}
declare module "interfaces/model/Model" {
    import { Serializable } from "interfaces/model/Serializable";
    import { ModelFactory } from "interfaces/model/modelFactory";
    export abstract class Model extends Serializable implements ModelFactory<Model> {
        abstract create(): Model;
        getIndex(): string;
    }
    export function indexKey(target: any, name: any): void;
}
declare module "classes/helper/List" {
    export class List<T> {
        private items;
        constructor();
        size(): number;
        add(value: T): void;
        get(index: number): T;
        first(): T;
        last(): T;
    }
}
declare module "classes/helper/ApiParser" {
    import { Model } from "interfaces/model/Model";
    import { List } from "classes/helper/List";
    export class ApiParser {
        static Parse<T extends Model>(response: string): T;
        static ParseList<T extends Model>(response: string): List<T>;
    }
}
declare module "interfaces/data/DataRepository" {
    import { Model } from "interfaces/model/Model";
    import { List } from "classes/helper/List";
    import { ModelFactory } from "interfaces/model/modelFactory";
    export interface DataRepository<T extends Model> {
        getItem(modelID: string): Promise<T>;
        exists(modelID: string): Promise<boolean>;
        getAllItems(): Promise<List<T>>;
        getRange(modelIDList: List<string>): Promise<List<T>>;
        count(): number;
        addItem(modelItem: T): Promise<T>;
        removeItem(emptyModelWithID: T): Promise<T>;
        saveItem(modelItem: T): Promise<T>;
        factory: ModelFactory<T>;
    }
}
declare module "classes/helper/ApiRepository" {
    import { Model } from "interfaces/model/Model";
    import { List } from "classes/helper/List";
    import { DataRepository } from "interfaces/data/DataRepository";
    import { ModelFactory } from "interfaces/model/modelFactory";
    export abstract class ApiRepository<T extends Model> implements DataRepository<T> {
        abstract getUrl(): string;
        factory: ModelFactory<T>;
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
        removeItem(emptyModelWithID: T): Promise<T>;
        saveItem(modelItem: T): Promise<T>;
    }
}
declare module "interfaces/model/Ctor" {
    export interface ICtor<T> {
        new (): T;
    }
}
declare module "interfaces/service/Service" {
    export interface Service {
    }
}
declare module "index" {
    export * from "classes/helper/ApiParser";
    export * from "classes/helper/ApiRepository";
    export * from "classes/helper/List";
    export * from "interfaces/data/DataRepository";
    export * from "interfaces/model/Ctor";
    export * from "interfaces/model/Model";
    export * from "interfaces/service/Service";
}
