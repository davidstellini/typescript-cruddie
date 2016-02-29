/// <reference path="../src/typings/bluebird/bluebird.d.ts" />
/// <reference path="../src/typings/form-data/form-data.d.ts" />
/// <reference path="../src/typings/node/node.d.ts" />
/// <reference path="../src/typings/request-promise/request-promise.d.ts" />
/// <reference path="../src/typings/request/request.d.ts" />
/// <reference path="../src/typings/tsd.d.ts" />
declare module 'tsmvc/lib/interfaces/model/Serializable' {
	export abstract class Serializable {
	    FromJson(obj: any): void;
	    Stringify(): string;
	    parse<T extends Serializable>(string: string): T;
	}

}
declare module 'tsmvc/lib/interfaces/model/modelFactory' {
	import { Model } from 'tsmvc/lib/interfaces/model/Model';
	export interface ModelFactory<T extends Model> {
	    create(): T;
	}

}
declare module 'tsmvc/lib/interfaces/model/Model' {
	import { Serializable } from 'tsmvc/lib/interfaces/model/Serializable';
	import { ModelFactory } from 'tsmvc/lib/interfaces/model/modelFactory';
	export abstract class Model extends Serializable implements ModelFactory<Model> {
	    abstract create(): Model;
	    getIndex(): string;
	}
	export function indexKey(target: any, name: any): void;

}
declare module 'tsmvc/lib/classes/helper/List' {
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
declare module 'tsmvc/lib/classes/helper/ApiParser' {
	import { Model } from 'tsmvc/lib/interfaces/model/Model';
	import { List } from 'tsmvc/lib/classes/helper/List';
	export abstract class ApiItemParser<T extends Model> {
	    Parse(response: string): T;
	    ParseList(response: string): List<T>;
	}

}
declare module 'tsmvc/lib/interfaces/data/DataRepository' {
	import { Model } from 'tsmvc/lib/interfaces/model/Model';
	import { List } from 'tsmvc/lib/classes/helper/List';
	import { ModelFactory } from 'tsmvc/lib/interfaces/model/modelFactory';
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
declare module 'tsmvc/lib/classes/helper/ApiRepository' {
	import { Model } from 'tsmvc/lib/interfaces/model/Model';
	import { List } from 'tsmvc/lib/classes/helper/List';
	import { DataRepository } from 'tsmvc/lib/interfaces/data/DataRepository';
	import { ModelFactory } from 'tsmvc/lib/interfaces/model/modelFactory';
	import { ApiItemParser } from 'tsmvc/lib/classes/helper/ApiParser';
	export abstract class ApiRepository<T extends Model> implements DataRepository<T> {
	    abstract getUrl(): string;
	    factory: ModelFactory<T>;
	    exists(modelID: string): Promise<boolean>;
	    getRange(modelIDList: List<string>): Promise<List<T>>;
	    count(): number;
	    buildReqOptions(requestType: string, url: string, model: any): any;
	    buildRequestAndParseAsT<T extends Model>(url: string, requestType: string, parser: ApiItemParser<T>, model: T): Promise<T>;
	    buildRequestAndParseAsTList<T extends Model>(url: string, requestType: string, parser: ApiItemParser<T>, model: T): Promise<List<T>>;
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
declare module 'tsmvc/lib/interfaces/model/Ctor' {
	export interface ICtor<T> {
	    new (): T;
	}

}
declare module 'tsmvc/node_modules/inversify/type_definitions/inversify-npm' {
	// Type definitions for inversify 1.2.2
	// Project: https://github.com/inversify/InversifyJS
	// Definitions by: inversify <https://github.com/inversify>
	// Definitions: https://github.com/borisyankov/DefinitelyTyped

	interface TypeBindingInterface<TServiceType> {
	  runtimeIdentifier : string;
	  implementationType : { new(): TServiceType ;};
	  cache : TServiceType;
	  scope : number; // TypeBindingScopeEnum
	}

	interface KernelInterface {
	  bind(typeBinding : TypeBindingInterface<any>) : void;
	  unbind(runtimeIdentifier : string) : void;
	  unbindAll() : void;
	  resolve<TImplementationType>(runtimeIdentifier : string) : TImplementationType;
	}

	export enum TypeBindingScopeEnum {
	    Transient = 0,
	    Singleton = 1,
	}

	export class TypeBinding<TServiceType> implements TypeBindingInterface<TServiceType> {
	    runtimeIdentifier: string;
	    implementationType: {
	        new (): TServiceType;
	    };
	    cache: TServiceType;
	    scope: TypeBindingScopeEnum;
	    constructor(runtimeIdentifier: string, implementationType: {
	        new (...args: any[]): TServiceType;
	    }, scopeType?: TypeBindingScopeEnum);
	}

	export class Kernel implements KernelInterface {
	    private _bindings;
	    bind(typeBinding: TypeBindingInterface<any>): void;
	    unbind(runtimeIdentifier: string): void;
	    unbindAll(): void;
	    resolve<TImplementationType>(runtimeIdentifier: string): TImplementationType;
	    private _validateBinding(typeBinding);
	    private _getConstructorArguments(func);
	    private _injectDependencies<TImplementationType>(func);
	    private _construct<TImplementationType>(constr, args);
	    constructor();
	}

	export function Inject(...typeIdentifier: string[]): (constructor: any) => any;
}
declare module 'tsmvc/lib/interfaces/service/Service' {
	export interface Service {
	}

}
declare module 'tsmvc/lib/index' {
	export * from 'tsmvc/lib/classes/helper/ApiParser';
	export * from 'tsmvc/lib/classes/helper/ApiRepository';
	export * from 'tsmvc/lib/classes/helper/DefaultApiParser';
	export * from 'tsmvc/lib/classes/helper/List';
	export * from 'tsmvc/lib/interfaces/data/DataRepository';
	export * from 'tsmvc/lib/interfaces/model/Ctor';
	export * from 'tsmvc/lib/interfaces/model/Model';
	export * from 'tsmvc/lib/interfaces/service/Service';

}
// Type definitions for inversify 1.0.0
// Project: https://github.com/inversify/InversifyJS
// Definitions by: inversify <https://github.com/inversify>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module inversify {
  
  interface TypeBindingInterface<TServiceType> {
    runtimeIdentifier : string;
    implementationType : { new(): TServiceType ;};
    cache : TServiceType;
    scope : number; // TypeBindingScopeEnum
  }

  interface KernelInterface {
    bind(typeBinding : TypeBindingInterface<any>) : void;
    unbind(runtimeIdentifier : string) : void;
    unbindAll() : void;
    resolve<TImplementationType>(runtimeIdentifier : string) : TImplementationType;
  }

  enum TypeBindingScopeEnum {
      Transient = 0,
      Singleton = 1,
  }

  class TypeBinding<TServiceType> implements TypeBindingInterface<TServiceType> {
      runtimeIdentifier: string;
      implementationType: {
          new (): TServiceType;
      };
      cache: TServiceType;
      scope: TypeBindingScopeEnum;
      constructor(runtimeIdentifier: string, implementationType: {
          new (...args: any[]): TServiceType;
      }, scopeType?: TypeBindingScopeEnum);
  }

  class Kernel implements KernelInterface {
      private _bindings;
      bind(typeBinding: TypeBindingInterface<any>): void;
      unbind(runtimeIdentifier: string): void;
      unbindAll(): void;
      resolve<TImplementationType>(runtimeIdentifier: string): TImplementationType;
      private _validateBinding(typeBinding);
      private _getConstructorArguments(func);
      private _injectDependencies<TImplementationType>(func);
      private _construct<TImplementationType>(constr, args);
      constructor();
  }
}
declare module 'tsmvc' {
	import main = require('tsmvc/lib/index');
	export = main;
}
