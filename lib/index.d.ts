/// <reference path="../typings/main.d.ts" />
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
	export class ApiParser {
	    static Parse<T extends Model>(response: string): T;
	    static ParseList<T extends Model>(response: string): List<T>;
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
	export * from 'tsmvc/lib/classes/helper/List';
	export * from 'tsmvc/lib/interfaces/data/DataRepository';
	export * from 'tsmvc/lib/interfaces/model/Ctor';
	export * from 'tsmvc/lib/interfaces/model/Model';
	export * from 'tsmvc/lib/interfaces/service/Service';

}
// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/dd328830dddffbe19e9addd7cf8532cbd3600816/bluebird/bluebird.d.ts
// Type definitions for bluebird 2.0.0
// Project: https://github.com/petkaantonov/bluebird
// Definitions by: Bart van der Schoor <https://github.com/Bartvds>, falsandtru <https://github.com/falsandtru>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// ES6 model with generics overload was sourced and trans-multiplied from es6-promises.d.ts
// By: Campredon <https://github.com/fdecampredon/>

// Warning: recommended to use `tsc > v0.9.7` (critical bugs in earlier generic code):
// - https://github.com/borisyankov/DefinitelyTyped/issues/1563

// Note: replicate changes to all overloads in both definition and test file
// Note: keep both static and instance members inline (so similar)

// TODO fix remaining TODO annotations in both definition and test

// TODO verify support to have no return statement in handlers to get a Promise<void> (more overloads?)

declare var Promise: PromiseConstructor;

interface PromiseConstructor {
    /**
     * Create a new promise. The passed in function will receive functions `resolve` and `reject` as its arguments which can be called to seal the fate of the created promise.
     */
    new <T>(callback: (resolve: (thenableOrResult?: T | PromiseLike<T>) => void, reject: (error: any) => void) => void): Promise<T>;

    // Ideally, we'd define e.g. "export class RangeError extends Error {}",
    // but as Error is defined as an interface (not a class), TypeScript doesn't
    // allow extending Error, only implementing it.
    // However, if we want to catch() only a specific error type, we need to pass
    // a constructor function to it. So, as a workaround, we define them here as such.
    RangeError(): RangeError;
    CancellationError(): Promise.CancellationError;
    TimeoutError(): Promise.TimeoutError;
    TypeError(): Promise.TypeError;
    RejectionError(): Promise.RejectionError;
    OperationalError(): Promise.OperationalError;

    /**
     * Changes how bluebird schedules calls a-synchronously.
     *
     * @param scheduler Should be a function that asynchronously schedules
     *                  the calling of the passed in function
     */
    setScheduler(scheduler: (callback: (...args: any[]) => void) => void): void;

    /**
     * Start the chain of promises with `Promise.try`. Any synchronous exceptions will be turned into rejections on the returned promise.
     *
     * Note about second argument: if it's specifically a true array, its values become respective arguments for the function call. Otherwise it is passed as is as the first argument for the function call.
     *
     * Alias for `attempt();` for compatibility with earlier ECMAScript version.
     */
    try<T>(fn: () => T | PromiseLike<T>, args?: any[], ctx?: any): Promise<T>;

    attempt<T>(fn: () => T | PromiseLike<T>, args?: any[], ctx?: any): Promise<T>;

    /**
     * Returns a new function that wraps the given function `fn`. The new function will always return a promise that is fulfilled with the original functions return values or rejected with thrown exceptions from the original function.
     * This method is convenient when a function can sometimes return synchronously or throw synchronously.
     */
    method(fn: Function): Function;

    /**
     * Create a promise that is resolved with the given `value`. If `value` is a thenable or promise, the returned promise will assume its state.
     */
    resolve<T>(value: T | PromiseLike<T>): Promise<T>;
    resolve(): Promise<void>;

    /**
     * Create a promise that is rejected with the given `reason`.
     */
    reject(reason: any): Promise<any>;
    reject<T>(reason: any): Promise<T>;

    /**
     * Create a promise with undecided fate and return a `PromiseResolver` to control it. See resolution?: Promise(#promise-resolution).
     */
    defer<T>(): Promise.Resolver<T>;

    /**
     * Cast the given `value` to a trusted promise. If `value` is already a trusted `Promise`, it is returned as is. If `value` is not a thenable, a fulfilled is: Promise returned with `value` as its fulfillment value. If `value` is a thenable (Promise-like object, like those returned by jQuery's `$.ajax`), returns a trusted that: Promise assimilates the state of the thenable.
     */
    cast<T>(value: T | PromiseLike<T>): Promise<T>;

    /**
     * Sugar for `Promise.resolve(undefined).bind(thisArg);`. See `.bind()`.
     */
    bind(thisArg: any): Promise<void>;

    /**
     * See if `value` is a trusted Promise.
     */
    is(value: any): boolean;

    /**
     * Call this right after the library is loaded to enabled long stack traces. Long stack traces cannot be disabled after being enabled, and cannot be enabled after promises have alread been created. Long stack traces imply a substantial performance penalty, around 4-5x for throughput and 0.5x for latency.
     */
    longStackTraces(): void;

    /**
     * Returns a promise that will be fulfilled with `value` (or `undefined`) after given `ms` milliseconds. If `value` is a promise, the delay will start counting down when it is fulfilled and the returned promise will be fulfilled with the fulfillment value of the `value` promise.
     */
    // TODO enable more overloads
    delay<T>(ms: number, value: T | PromiseLike<T>): Promise<T>;
    delay(ms: number): Promise<void>;

    /**
     * Returns a function that will wrap the given `nodeFunction`. Instead of taking a callback, the returned function will return a promise whose fate is decided by the callback behavior of the given node function. The node function should conform to node.js convention of accepting a callback as last argument and calling that callback with error as the first argument and success value on the second argument.
     *
     * If the `nodeFunction` calls its callback with multiple success values, the fulfillment value will be an array of them.
     *
     * If you pass a `receiver`, the `nodeFunction` will be called as a method on the `receiver`.
     */
    promisify<T>(func: (callback: (err: any, result: T) => void) => void, receiver?: any): () => Promise<T>;
    promisify<T, A1>(func: (arg1: A1, callback: (err: any, result: T) => void) => void, receiver?: any): (arg1: A1) => Promise<T>;
    promisify<T, A1, A2>(func: (arg1: A1, arg2: A2, callback: (err: any, result: T) => void) => void, receiver?: any): (arg1: A1, arg2: A2) => Promise<T>;
    promisify<T, A1, A2, A3>(func: (arg1: A1, arg2: A2, arg3: A3, callback: (err: any, result: T) => void) => void, receiver?: any): (arg1: A1, arg2: A2, arg3: A3) => Promise<T>;
    promisify<T, A1, A2, A3, A4>(func: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, callback: (err: any, result: T) => void) => void, receiver?: any): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Promise<T>;
    promisify<T, A1, A2, A3, A4, A5>(func: (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5, callback: (err: any, result: T) => void) => void, receiver?: any): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Promise<T>;
    promisify(nodeFunction: Function, receiver?: any): Function;

    /**
     * Promisifies the entire object by going through the object's properties and creating an async equivalent of each function on the object and its prototype chain. The promisified method name will be the original method name postfixed with `Async`. Returns the input object.
     *
     * Note that the original methods on the object are not overwritten but new methods are created with the `Async`-postfix. For example, if you `promisifyAll()` the node.js `fs` object use `fs.statAsync()` to call the promisified `stat` method.
     */
    // TODO how to model promisifyAll?
    promisifyAll(target: Object, options?: Promise.PromisifyAllOptions): any;


    /**
     * Returns a promise that is resolved by a node style callback function.
     */
    fromNode(resolver: (callback: (err: any, result?: any) => void) => void, options? : {multiArgs? : boolean}): Promise<any>;
    fromCallback(resolver: (callback: (err: any, result?: any) => void) => void, options? : {multiArgs? : boolean}): Promise<any>;

    /**
     * Returns a function that can use `yield` to run asynchronous code synchronously. This feature requires the support of generators which are drafted in the next version of the language. Node version greater than `0.11.2` is required and needs to be executed with the `--harmony-generators` (or `--harmony`) command-line switch.
     */
    // TODO fix coroutine GeneratorFunction
    coroutine<T>(generatorFunction: Function): Function;

    /**
     * Spawn a coroutine which may yield promises to run asynchronous code synchronously. This feature requires the support of generators which are drafted in the next version of the language. Node version greater than `0.11.2` is required and needs to be executed with the `--harmony-generators` (or `--harmony`) command-line switch.
     */
    // TODO fix spawn GeneratorFunction
    spawn<T>(generatorFunction: Function): Promise<T>;

    /**
     * This is relevant to browser environments with no module loader.
     *
     * Release control of the `Promise` namespace to whatever it was before this library was loaded. Returns a reference to the library namespace so you can attach it to something else.
     */
    noConflict(): typeof Promise;

    /**
     * Add `handler` as the handler to call when there is a possibly unhandled rejection. The default handler logs the error stack to stderr or `console.error` in browsers.
     *
     * Passing no value or a non-function will have the effect of removing any kind of handling for possibly unhandled rejections.
     */
    onPossiblyUnhandledRejection(handler: (reason: any) => any): void;

    /**
     * Given an array, or a promise of an array, which contains promises (or a mix of promises and values) return a promise that is fulfilled when all the items in the array are fulfilled. The promise's fulfillment value is an array with fulfillment values at respective positions to the original array. If any promise in the array rejects, the returned promise is rejected with the rejection reason.
     */
    // TODO enable more overloads
    // promise of array with promises of value
    all<T>(values: PromiseLike<PromiseLike<T>[]>): Promise<T[]>;
    // promise of array with values
    all<T>(values: PromiseLike<T[]>): Promise<T[]>;
    // array with promises of value
    all<T>(values: PromiseLike<T>[]): Promise<T[]>;
    // array with promises of different types
    all<T1, T2, T3, T4, T5>(values: [PromiseLike<T1>, PromiseLike<T2>, PromiseLike<T3>, PromiseLike<T4>, PromiseLike<T5>]): Promise<[T1, T2, T3, T4, T5]>;
    all<T1, T2, T3, T4>(values: [PromiseLike<T1>, PromiseLike<T2>, PromiseLike<T3>, PromiseLike<T4>]): Promise<[T1, T2, T3, T4]>;
    all<T1, T2, T3>(values: [PromiseLike<T1>, PromiseLike<T2>, PromiseLike<T3>]): Promise<[T1, T2, T3]>;
    all<T1, T2>(values: [PromiseLike<T1>, PromiseLike<T2>]): Promise<[T1, T2]>;
    // array with values
    all<T>(values: T[]): Promise<T[]>;

    /**
     * Like ``Promise.all`` but for object properties instead of array items. Returns a promise that is fulfilled when all the properties of the object are fulfilled. The promise's fulfillment value is an object with fulfillment values at respective keys to the original object. If any promise in the object rejects, the returned promise is rejected with the rejection reason.
     *
     * If `object` is a trusted `Promise`, then it will be treated as a promise for object rather than for its properties. All other objects are treated for their properties as is returned by `Object.keys` - the object's own enumerable properties.
     *
     * *The original object is not modified.*
     */
    // TODO verify this is correct
    // trusted promise for object
    props(object: Promise<Object>): Promise<Object>;
    // object
    props(object: Object): Promise<Object>;

    /**
     * Given an array, or a promise of an array, which contains promises (or a mix of promises and values) return a promise that is fulfilled when all the items in the array are either fulfilled or rejected. The fulfillment value is an array of ``PromiseInspection`` instances at respective positions in relation to the input array.
     *
     * *original: The array is not modified. The input array sparsity is retained in the resulting array.*
     */
    // promise of array with promises of value
    settle<T>(values: PromiseLike<PromiseLike<T>[]>): Promise<Promise.Inspection<T>[]>;
    // promise of array with values
    settle<T>(values: PromiseLike<T[]>): Promise<Promise.Inspection<T>[]>;
    // array with promises of value
    settle<T>(values: PromiseLike<T>[]): Promise<Promise.Inspection<T>[]>;
    // array with values
    settle<T>(values: T[]): Promise<Promise.Inspection<T>[]>;

    /**
     * Like `Promise.some()`, with 1 as `count`. However, if the promise fulfills, the fulfillment value is not an array of 1 but the value directly.
     */
    // promise of array with promises of value
    any<T>(values: PromiseLike<PromiseLike<T>[]>): Promise<T>;
    // promise of array with values
    any<T>(values: PromiseLike<T[]>): Promise<T>;
    // array with promises of value
    any<T>(values: PromiseLike<T>[]): Promise<T>;
    // array with values
    any<T>(values: T[]): Promise<T>;

    /**
     * Given an array, or a promise of an array, which contains promises (or a mix of promises and values) return a promise that is fulfilled or rejected as soon as a promise in the array is fulfilled or rejected with the respective rejection reason or fulfillment value.
     *
     * **Note** If you pass empty array or a sparse array with no values, or a promise/thenable for such, it will be forever pending.
     */
    // promise of array with promises of value
    race<T>(values: PromiseLike<PromiseLike<T>[]>): Promise<T>;
    // promise of array with values
    race<T>(values: PromiseLike<T[]>): Promise<T>;
    // array with promises of value
    race<T>(values: PromiseLike<T>[]): Promise<T>;
    // array with values
    race<T>(values: T[]): Promise<T>;

    /**
     * Initiate a competetive race between multiple promises or values (values will become immediately fulfilled promises). When `count` amount of promises have been fulfilled, the returned promise is fulfilled with an array that contains the fulfillment values of the winners in order of resolution.
     *
     * If too many promises are rejected so that the promise can never become fulfilled, it will be immediately rejected with an array of rejection reasons in the order they were thrown in.
     *
     * *The original array is not modified.*
     */
    // promise of array with promises of value
    some<T>(values: PromiseLike<PromiseLike<T>[]>, count: number): Promise<T[]>;
    // promise of array with values
    some<T>(values: PromiseLike<T[]>, count: number): Promise<T[]>;
    // array with promises of value
    some<T>(values: PromiseLike<T>[], count: number): Promise<T[]>;
    // array with values
    some<T>(values: T[], count: number): Promise<T[]>;

    /**
     * Like `Promise.all()` but instead of having to pass an array, the array is generated from the passed variadic arguments.
     */
    // variadic array with promises of value
    join<T>(...values: PromiseLike<T>[]): Promise<T[]>;
    // variadic array with values
    join<T>(...values: T[]): Promise<T[]>;

    /**
     * Map an array, or a promise of an array, which contains a promises (or a mix of promises and values) with the given `mapper` function with the signature `(item, index, arrayLength)` where `item` is the resolved value of a respective promise in the input array. If any promise in the input array is rejected the returned promise is rejected as well.
     *
     * If the `mapper` function returns promises or thenables, the returned promise will wait for all the mapped results to be resolved as well.
     *
     * *The original array is not modified.*
     */
    // promise of array with promises of value
    map<T, U>(values: PromiseLike<PromiseLike<T>[]>, mapper: (item: T, index: number, arrayLength: number) => U | PromiseLike<U>, options?: Promise.ConcurrencyOption): Promise<U[]>;

    // promise of array with values
    map<T, U>(values: PromiseLike<T[]>, mapper: (item: T, index: number, arrayLength: number) => U | PromiseLike<U>, options?: Promise.ConcurrencyOption): Promise<U[]>;

    // array with promises of value
    map<T, U>(values: PromiseLike<T>[], mapper: (item: T, index: number, arrayLength: number) => U | PromiseLike<U>, options?: Promise.ConcurrencyOption): Promise<U[]>;

    // array with values
    map<T, U>(values: T[], mapper: (item: T, index: number, arrayLength: number) => U | PromiseLike<U>, options?: Promise.ConcurrencyOption): Promise<U[]>;

    /**
     * Similar to `map` with concurrency set to 1 but guaranteed to execute in sequential order
     *
     * If the `mapper` function returns promises or thenables, the returned promise will wait for all the mapped results to be resolved as well.
     *
     * *The original array is not modified.*
     */
    // promise of array with promises of value
    mapSeries<R, U>(values: PromiseLike<PromiseLike<R>[]>, mapper: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<U[]>;

    // promise of array with values
    mapSeries<R, U>(values: PromiseLike<R[]>, mapper: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<U[]>;

    // array with promises of value
    mapSeries<R, U>(values: PromiseLike<R>[], mapper: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<U[]>;

    // array with values
    mapSeries<R, U>(values: R[], mapper: (item: R, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<U[]>;
    

    /**
     * Reduce an array, or a promise of an array, which contains a promises (or a mix of promises and values) with the given `reducer` function with the signature `(total, current, index, arrayLength)` where `item` is the resolved value of a respective promise in the input array. If any promise in the input array is rejected the returned promise is rejected as well.
     *
     * If the reducer function returns a promise or a thenable, the result for the promise is awaited for before continuing with next iteration.
     *
     * *The original array is not modified. If no `intialValue` is given and the array doesn't contain at least 2 items, the callback will not be called and `undefined` is returned. If `initialValue` is given and the array doesn't have at least 1 item, `initialValue` is returned.*
     */
    // promise of array with promises of value
    reduce<T, U>(values: PromiseLike<PromiseLike<T>[]>, reducer: (total: U, current: T, index: number, arrayLength: number) => U | PromiseLike<U>, initialValue?: U): Promise<U>;

    // promise of array with values
    reduce<T, U>(values: PromiseLike<T[]>, reducer: (total: U, current: T, index: number, arrayLength: number) => U | PromiseLike<U>, initialValue?: U): Promise<U>;

    // array with promises of value
    reduce<T, U>(values: PromiseLike<T>[], reducer: (total: U, current: T, index: number, arrayLength: number) => U | PromiseLike<U>, initialValue?: U): Promise<U>;

    // array with values
    reduce<T, U>(values: T[], reducer: (total: U, current: T, index: number, arrayLength: number) => U | PromiseLike<U>, initialValue?: U): Promise<U>;

    /**
     * Filter an array, or a promise of an array, which contains a promises (or a mix of promises and values) with the given `filterer` function with the signature `(item, index, arrayLength)` where `item` is the resolved value of a respective promise in the input array. If any promise in the input array is rejected the returned promise is rejected as well.
     *
     * The return values from the filtered functions are coerced to booleans, with the exception of promises and thenables which are awaited for their eventual result.
     *
     * *The original array is not modified.
     */
    // promise of array with promises of value
    filter<T>(values: PromiseLike<PromiseLike<T>[]>, filterer: (item: T, index: number, arrayLength: number) => boolean | PromiseLike<boolean>, option?: Promise.ConcurrencyOption): Promise<T[]>;

    // promise of array with values
    filter<T>(values: PromiseLike<T[]>, filterer: (item: T, index: number, arrayLength: number) => boolean | PromiseLike<boolean>, option?: Promise.ConcurrencyOption): Promise<T[]>;

    // array with promises of value
    filter<T>(values: PromiseLike<T>[], filterer: (item: T, index: number, arrayLength: number) => boolean | PromiseLike<boolean>, option?: Promise.ConcurrencyOption): Promise<T[]>;

    // array with values
    filter<T>(values: T[], filterer: (item: T, index: number, arrayLength: number) => boolean | PromiseLike<boolean>, option?: Promise.ConcurrencyOption): Promise<T[]>;

    /**
     * Iterate over an array, or a promise of an array, which contains promises (or a mix of promises and values) with the given iterator function with the signature (item, index, value) where item is the resolved value of a respective promise in the input array. Iteration happens serially. If any promise in the input array is rejected the returned promise is rejected as well.
     *
     * Resolves to the original array unmodified, this method is meant to be used for side effects. If the iterator function returns a promise or a thenable, the result for the promise is awaited for before continuing with next iteration.
     */
    // promise of array with promises of value
    each<T, U>(values: PromiseLike<PromiseLike<T>[]>, iterator: (item: T, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<T[]>;
    // array with promises of value
    each<T, U>(values: PromiseLike<T>[], iterator: (item: T, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<T[]>;
    // array with values OR promise of array with values
    each<T, U>(values: T[] | PromiseLike<T[]>, iterator: (item: T, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<T[]>;
}

interface Promise<T> extends PromiseLike<T>, Promise.Inspection<T> {
    /**
     * Promises/A+ `.then()` with progress handler. Returns a new promise chained from this promise. The new promise will be rejected or resolved dedefer on the passed `fulfilledHandler`, `rejectedHandler` and the state of this promise.
     */
    then<U>(onFulfill: (value: T) => U | PromiseLike<U>, onReject?: (error: any) => U | PromiseLike<U>, onProgress?: (note: any) => any): Promise<U>;
    then<U>(onFulfill: (value: T) => U | PromiseLike<U>, onReject?: (error: any) => void | PromiseLike<void>, onProgress?: (note: any) => any): Promise<U>;

    /**
     * This is a catch-all exception handler, shortcut for calling `.then(null, handler)` on this promise. Any exception happening in a `.then`-chain will propagate to nearest `.catch` handler.
     *
     * Alias `.caught();` for compatibility with earlier ECMAScript version.
     */
    catch(onReject?: (error: any) => T | PromiseLike<T> | void | PromiseLike<void>): Promise<T>;
    caught(onReject?: (error: any) => T | PromiseLike<T> | void | PromiseLike<void>): Promise<T>;

    catch<U>(onReject?: (error: any) => U | PromiseLike<U>): Promise<U | T>;
    caught<U>(onReject?: (error: any) => U | PromiseLike<U>): Promise<U | T>;

    /**
     * This extends `.catch` to work more like catch-clauses in languages like Java or C#. Instead of manually checking `instanceof` or `.name === "SomeError"`, you may specify a number of error constructors which are eligible for this catch handler. The catch handler that is first met that has eligible constructors specified, is the one that will be called.
     *
     * This method also supports predicate-based filters. If you pass a predicate function instead of an error constructor, the predicate will receive the error as an argument. The return result of the predicate will be used determine whether the error handler should be called.
     *
     * Alias `.caught();` for compatibility with earlier ECMAScript version.
     */
    catch(predicate: (error: any) => boolean, onReject: (error: any) => T | PromiseLike<T> | void | PromiseLike<void>): Promise<T>;
    caught(predicate: (error: any) => boolean, onReject: (error: any) => T | PromiseLike<T> | void | PromiseLike<void>): Promise<T>;

    catch<U>(predicate: (error: any) => boolean, onReject: (error: any) => U | PromiseLike<U>): Promise<U | T>;
    caught<U>(predicate: (error: any) => boolean, onReject: (error: any) => U | PromiseLike<U>): Promise<U | T>;

    catch(ErrorClass: Function, onReject: (error: any) => T | PromiseLike<T> | void | PromiseLike<void>): Promise<T>;
    caught(ErrorClass: Function, onReject: (error: any) => T | PromiseLike<T> | void | PromiseLike<void>): Promise<T>;

    catch<U>(ErrorClass: Function, onReject: (error: any) => U | PromiseLike<U>): Promise<U | T>;
    caught<U>(ErrorClass: Function, onReject: (error: any) => U | PromiseLike<U>): Promise<U | T>;


    /**
     * Like `.catch` but instead of catching all types of exceptions, it only catches those that don't originate from thrown errors but rather from explicit rejections.
     */
    error<U>(onReject: (reason: any) => PromiseLike<U>): Promise<U>;
    error<U>(onReject: (reason: any) => U): Promise<U>;

    /**
     * Pass a handler that will be called regardless of this promise's fate. Returns a new promise chained from this promise. There are special semantics for `.finally()` in that the final value cannot be modified from the handler.
     *
     * Alias `.lastly();` for compatibility with earlier ECMAScript version.
     */
    finally<U>(handler: () => U | PromiseLike<U>): Promise<T>;

    lastly<U>(handler: () => U | PromiseLike<U>): Promise<T>;

    /**
     * Create a promise that follows this promise, but is bound to the given `thisArg` value. A bound promise will call its handlers with the bound value set to `this`. Additionally promises derived from a bound promise will also be bound promises with the same `thisArg` binding as the original promise.
     */
    bind(thisArg: any): Promise<T>;

    /**
     * Like `.then()`, but any unhandled rejection that ends up here will be thrown as an error.
     */
    done<U>(onFulfilled?: (value: T) => PromiseLike<U>, onRejected?: (error: any) => U | PromiseLike<U>, onProgress?: (note: any) => any): void;
    done<U>(onFulfilled?: (value: T) => U, onRejected?: (error: any) => U | PromiseLike<U>, onProgress?: (note: any) => any): void;

    /**
     * Like `.finally()`, but not called for rejections.
     */
    tap<U>(onFulFill: (value: T) => U | PromiseLike<U>): Promise<T>;

    /**
     * Shorthand for `.then(null, null, handler);`. Attach a progress handler that will be called if this promise is progressed. Returns a new promise chained from this promise.
     */
    progressed(handler: (note: any) => any): Promise<T>;

    /**
     * Same as calling `Promise.delay(this, ms)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
     */
    delay(ms: number): Promise<T>;

    /**
     * Returns a promise that will be fulfilled with this promise's fulfillment value or rejection reason. However, if this promise is not fulfilled or rejected within `ms` milliseconds, the returned promise is rejected with a `Promise.TimeoutError` instance.
     *
     * You may specify a custom error message with the `message` parameter.
     */
    timeout(ms: number, message?: string): Promise<T>;

    /**
     * Register a node-style callback on this promise. When this promise is is either fulfilled or rejected, the node callback will be called back with the node.js convention where error reason is the first argument and success value is the second argument. The error argument will be `null` in case of success.
     * Returns back this promise instead of creating a new one. If the `callback` argument is not a function, this method does not do anything.
     */
    nodeify(callback: (err: any, value?: T) => void, options?: Promise.SpreadOption): Promise<T>;
    nodeify(...sink: any[]): Promise<T>;

    /**
     * Marks this promise as cancellable. Promises by default are not cancellable after v0.11 and must be marked as such for `.cancel()` to have any effect. Marking a promise as cancellable is infectious and you don't need to remark any descendant promise.
     */
    cancellable(): Promise<T>;

    /**
     * Cancel this promise. The cancellation will propagate to farthest cancellable ancestor promise which is still pending.
     *
     * That ancestor will then be rejected with a `CancellationError` (get a reference from `Promise.CancellationError`) object as the rejection reason.
     *
     * In a promise rejection handler you may check for a cancellation by seeing if the reason object has `.name === "Cancel"`.
     *
     * Promises are by default not cancellable. Use `.cancellable()` to mark a promise as cancellable.
     */
    // TODO what to do with this?
    cancel<U>(reason?: any): Promise<U>;

    /**
     * Like `.then()`, but cancellation of the the returned promise or any of its descendant will not propagate cancellation to this promise or this promise's ancestors.
     */
    fork<U>(onFulfilled?: (value: T) => U | PromiseLike<U>, onRejected?: (error: any) => U | PromiseLike<U>, onProgress?: (note: any) => any): Promise<U>;

    /**
     * Create an uncancellable promise based on this promise.
     */
    uncancellable(): Promise<T>;

    /**
     * See if this promise can be cancelled.
     */
    isCancellable(): boolean;

    /**
     * See if this `promise` has been fulfilled.
     */
    isFulfilled(): boolean;

    /**
     * See if this `promise` has been rejected.
     */
    isRejected(): boolean;

    /**
     * See if this `promise` is still defer.
     */
    isPending(): boolean;

    /**
     * See if this `promise` is resolved -> either fulfilled or rejected.
     */
    isResolved(): boolean;

    /**
     * Get the fulfillment value of the underlying promise. Throws if the promise isn't fulfilled yet.
     *
     * throws `TypeError`
     */
    value(): T;

    /**
     * Get the rejection reason for the underlying promise. Throws if the promise isn't rejected yet.
     *
     * throws `TypeError`
     */
    reason(): any;

    /**
     * Synchronously inspect the state of this `promise`. The `PromiseInspection` will represent the state of the promise as snapshotted at the time of calling `.inspect()`.
     */
    inspect(): Promise.Inspection<T>;

    /**
     * This is a convenience method for doing:
     *
     * <code>
     * promise.then(function(obj){
    *     return obj[propertyName].call(obj, arg...);
    * });
     * </code>
     */
    call(propertyName: string, ...args: any[]): Promise<any>;

    /**
     * This is a convenience method for doing:
     *
     * <code>
     * promise.then(function(obj){
    *     return obj[propertyName];
    * });
     * </code>
     */
    // TODO find way to fix get()
    // get<U>(propertyName: string): Promise<U>;

    /**
     * Convenience method for:
     *
     * <code>
     * .then(function() {
    *    return value;
    * });
     * </code>
     *
     * in the case where `value` doesn't change its value. That means `value` is bound at the time of calling `.return()`
     *
     * Alias `.thenReturn();` for compatibility with earlier ECMAScript version.
     */
    return(): Promise<any>;
    thenReturn(): Promise<any>;
    return<U>(value: U): Promise<U>;
    thenReturn<U>(value: U): Promise<U>;

    /**
     * Convenience method for:
     *
     * <code>
     * .then(function() {
    *    throw reason;
    * });
     * </code>
     * Same limitations apply as with `.return()`.
     *
     * Alias `.thenThrow();` for compatibility with earlier ECMAScript version.
     */
    throw(reason: Error): Promise<T>;
    thenThrow(reason: Error): Promise<T>;

    /**
     * Convert to String.
     */
    toString(): string;

    /**
     * This is implicitly called by `JSON.stringify` when serializing the object. Returns a serialized representation of the `Promise`.
     */
    toJSON(): Object;

    /**
     * Like calling `.then`, but the fulfillment value or rejection reason is assumed to be an array, which is flattened to the formal parameters of the handlers.
     */
    // TODO how to model instance.spread()? like Q?
    spread<U>(onFulfill: Function, onReject?: (reason: any) => U | PromiseLike<U>): Promise<U>;
    /*
     // TODO or something like this?
     spread<U, W>(onFulfill: (...values: W[]) => PromiseLike<U>, onReject?: (reason: any) => PromiseLike<U>): Promise<U>;
     spread<U, W>(onFulfill: (...values: W[]) => PromiseLike<U>, onReject?: (reason: any) => U): Promise<U>;
     spread<U, W>(onFulfill: (...values: W[]) => U, onReject?: (reason: any) => PromiseLike<U>): Promise<U>;
     spread<U, W>(onFulfill: (...values: W[]) => U, onReject?: (reason: any) => U): Promise<U>;
     */
    /**
     * Same as calling `Promise.all(thisPromise)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
     */
    // TODO type inference from array-resolving promise?
    all<U>(): Promise<U[]>;

    /**
     * Same as calling `Promise.props(thisPromise)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
     */
    // TODO how to model instance.props()?
    props(): Promise<Object>;

    /**
     * Same as calling `Promise.settle(thisPromise)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
     */
    // TODO type inference from array-resolving promise?
    settle<U>(): Promise<Promise.Inspection<U>[]>;

    /**
     * Same as calling `Promise.any(thisPromise)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
     */
    // TODO type inference from array-resolving promise?
    any<U>(): Promise<U>;

    /**
     * Same as calling `Promise.some(thisPromise)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
     */
    // TODO type inference from array-resolving promise?
    some<U>(count: number): Promise<U[]>;

    /**
     * Same as calling `Promise.race(thisPromise, count)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
     */
    // TODO type inference from array-resolving promise?
    race<U>(): Promise<U>;

    /**
     * Same as calling `Promise.map(thisPromise, mapper)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
     */
    // TODO type inference from array-resolving promise?
    map<Q, U>(mapper: (item: Q, index: number, arrayLength: number) => U | PromiseLike<U>, options?: Promise.ConcurrencyOption): Promise<U[]>;

    /**
     * Same as `Promise.mapSeries(thisPromise, mapper)`.
     */
    // TODO type inference from array-resolving promise?
    mapSeries<Q, U>(mapper: (item: Q, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<U[]>;

    /**
     * Same as calling `Promise.reduce(thisPromise, Function reducer, initialValue)`. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
     */
    // TODO type inference from array-resolving promise?
    reduce<Q, U>(reducer: (memo: U, item: Q, index: number, arrayLength: number) => U | PromiseLike<U>, initialValue?: U): Promise<U>;

    /**
     * Same as calling ``Promise.filter(thisPromise, filterer)``. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
     */
    // TODO type inference from array-resolving promise?
    filter<U>(filterer: (item: U, index: number, arrayLength: number) => boolean | PromiseLike<boolean>, options?: Promise.ConcurrencyOption): Promise<U[]>;

    /**
     * Same as calling ``Promise.each(thisPromise, iterator)``. With the exception that if this promise is bound to a value, the returned promise is bound to that value too.
     */
    each<T, U>(iterator: (item: T, index: number, arrayLength: number) => U | PromiseLike<U>): Promise<T[]>;
}

/**
 * Don't use variable namespace such as variables, functions, and classes.
 * If you use this namespace, it will conflict in es6.
 */
declare namespace Promise {
    export interface RangeError extends Error {
    }
    export interface CancellationError extends Error {
    }
    export interface TimeoutError extends Error {
    }
    export interface TypeError extends Error {
    }
    export interface RejectionError extends Error {
    }
    export interface OperationalError extends Error {
    }

    export interface ConcurrencyOption {
        concurrency: number;
    }
    export interface SpreadOption {
        spread: boolean;
    }
    export interface PromisifyAllOptions {
        suffix?: string;
        filter?: (name: string, func: Function, target?: any, passesDefaultFilter?: boolean) => boolean;
        // The promisifier gets a reference to the original method and should return a function which returns a promise
        promisifier?: (originalMethod: Function) => () => PromiseLike<any>;
    }

    export interface Resolver<T> {
        /**
         * Returns a reference to the controlled promise that can be passed to clients.
         */
        promise: Promise<T>;

        /**
         * Resolve the underlying promise with `value` as the resolution value. If `value` is a thenable or a promise, the underlying promise will assume its state.
         */
        resolve(value: T): void;
        resolve(): void;

        /**
         * Reject the underlying promise with `reason` as the rejection reason.
         */
        reject(reason: any): void;

        /**
         * Progress the underlying promise with `value` as the progression value.
         */
        progress(value: any): void;

        /**
         * Gives you a callback representation of the `PromiseResolver`. Note that this is not a method but a property. The callback accepts error object in first argument and success values on the 2nd parameter and the rest, I.E. node js conventions.
         *
         * If the the callback is called with multiple success values, the resolver fullfills its promise with an array of the values.
         */
        // TODO specify resolver callback
        callback: (err: any, value: T, ...values: T[]) => void;
    }

    export interface Inspection<T> {
        /**
         * See if the underlying promise was fulfilled at the creation time of this inspection object.
         */
        isFulfilled(): boolean;

        /**
         * See if the underlying promise was rejected at the creation time of this inspection object.
         */
        isRejected(): boolean;

        /**
         * See if the underlying promise was defer at the creation time of this inspection object.
         */
        isPending(): boolean;

        /**
         * Get the fulfillment value of the underlying promise. Throws if the promise wasn't fulfilled at the creation time of this inspection object.
         *
         * throws `TypeError`
         */
        value(): T;

        /**
         * Get the rejection reason for the underlying promise. Throws if the promise wasn't rejected at the creation time of this inspection object.
         *
         * throws `TypeError`
         */
        reason(): any;
    }
}

declare module 'bluebird' {
    export = Promise;
}// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/bb1b99052bf1d697f0368fbff56898bc1f5a525c/form-data/form-data.d.ts
// Type definitions for form-data
// Project: https://github.com/felixge/node-form-data
// Definitions by: Carlos Ballesteros Velasco <https://github.com/soywiz>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Imported from: https://github.com/soywiz/typescript-node-definitions/form-data.d.ts

declare module "form-data" {
	export class FormData {
		append(key: string, value: any, options?: any): FormData;
		getHeaders(): Object;
		// TODO expand pipe
		pipe(to: any): any;
		submit(params: string|Object, callback: (error: any, response: any) => void): any;
	}
}// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/31bfa9579b58e72f03941d4dbc9ebc6076139990/inversify/inversify.d.ts
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
}// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/48c1e3c1d6baefa4f1a126f188c27c4fefd36bff/node/node.d.ts
// Type definitions for Node.js v4.x
// Project: http://nodejs.org/
// Definitions by: Microsoft TypeScript <http://typescriptlang.org>, DefinitelyTyped <https://github.com/borisyankov/DefinitelyTyped>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/************************************************
*                                               *
*               Node.js v4.x API                *
*                                               *
************************************************/

interface Error {
    stack?: string;
}


// compat for TypeScript 1.5.3
// if you use with --target es3 or --target es5 and use below definitions,
// use the lib.es6.d.ts that is bundled with TypeScript 1.5.3.
interface MapConstructor {}
interface WeakMapConstructor {}
interface SetConstructor {}
interface WeakSetConstructor {}

/************************************************
*                                               *
*                   GLOBAL                      *
*                                               *
************************************************/
declare var process: NodeJS.Process;
declare var global: NodeJS.Global;

declare var __filename: string;
declare var __dirname: string;

declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer;
declare function clearTimeout(timeoutId: NodeJS.Timer): void;
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer;
declare function clearInterval(intervalId: NodeJS.Timer): void;
declare function setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
declare function clearImmediate(immediateId: any): void;

interface NodeRequireFunction {
    (id: string): any;
}

interface NodeRequire extends NodeRequireFunction {
    resolve(id:string): string;
    cache: any;
    extensions: any;
    main: any;
}

declare var require: NodeRequire;

interface NodeModule {
    exports: any;
    require: NodeRequireFunction;
    id: string;
    filename: string;
    loaded: boolean;
    parent: any;
    children: any[];
}

declare var module: NodeModule;

// Same as module.exports
declare var exports: any;
declare var SlowBuffer: {
    new (str: string, encoding?: string): Buffer;
    new (size: number): Buffer;
    new (size: Uint8Array): Buffer;
    new (array: any[]): Buffer;
    prototype: Buffer;
    isBuffer(obj: any): boolean;
    byteLength(string: string, encoding?: string): number;
    concat(list: Buffer[], totalLength?: number): Buffer;
};


// Buffer class
interface Buffer extends NodeBuffer {}

/**
 * Raw data is stored in instances of the Buffer class.
 * A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.  A Buffer cannot be resized.
 * Valid string encodings: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
 */
declare var Buffer: {
    /**
     * Allocates a new buffer containing the given {str}.
     *
     * @param str String to store in buffer.
     * @param encoding encoding to use, optional.  Default is 'utf8'
     */
    new (str: string, encoding?: string): Buffer;
    /**
     * Allocates a new buffer of {size} octets.
     *
     * @param size count of octets to allocate.
     */
    new (size: number): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: Uint8Array): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: any[]): Buffer;
    /**
     * Copies the passed {buffer} data onto a new {Buffer} instance.
     *
     * @param buffer The buffer to copy.
     */
    new (buffer: Buffer): Buffer;
    prototype: Buffer;
    /**
     * Returns true if {obj} is a Buffer
     *
     * @param obj object to test.
     */
    isBuffer(obj: any): obj is Buffer;
    /**
     * Returns true if {encoding} is a valid encoding argument.
     * Valid string encodings in Node 0.12: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
     *
     * @param encoding string to test.
     */
    isEncoding(encoding: string): boolean;
    /**
     * Gives the actual byte length of a string. encoding defaults to 'utf8'.
     * This is not the same as String.prototype.length since that returns the number of characters in a string.
     *
     * @param string string to test.
     * @param encoding encoding used to evaluate (defaults to 'utf8')
     */
    byteLength(string: string, encoding?: string): number;
    /**
     * Returns a buffer which is the result of concatenating all the buffers in the list together.
     *
     * If the list has no items, or if the totalLength is 0, then it returns a zero-length buffer.
     * If the list has exactly one item, then the first item of the list is returned.
     * If the list has more than one item, then a new Buffer is created.
     *
     * @param list An array of Buffer objects to concatenate
     * @param totalLength Total length of the buffers when concatenated.
     *   If totalLength is not provided, it is read from the buffers in the list. However, this adds an additional loop to the function, so it is faster to provide the length explicitly.
     */
    concat(list: Buffer[], totalLength?: number): Buffer;
    /**
     * The same as buf1.compare(buf2).
     */
    compare(buf1: Buffer, buf2: Buffer): number;
};

/************************************************
*                                               *
*               GLOBAL INTERFACES               *
*                                               *
************************************************/
declare module NodeJS {
    export interface ErrnoException extends Error {
        errno?: number;
        code?: string;
        path?: string;
        syscall?: string;
        stack?: string;
    }

    export interface EventEmitter {
        addListener(event: string, listener: Function): this;
        on(event: string, listener: Function): this;
        once(event: string, listener: Function): this;
        removeListener(event: string, listener: Function): this;
        removeAllListeners(event?: string): this;
        setMaxListeners(n: number): this;
        getMaxListeners(): number;
        listeners(event: string): Function[];
        emit(event: string, ...args: any[]): boolean;
        listenerCount(type: string): number;
    }

    export interface ReadableStream extends EventEmitter {
        readable: boolean;
        read(size?: number): string|Buffer;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe<T extends WritableStream>(destination: T, options?: { end?: boolean; }): T;
        unpipe<T extends WritableStream>(destination?: T): void;
        unshift(chunk: string): void;
        unshift(chunk: Buffer): void;
        wrap(oldStream: ReadableStream): ReadableStream;
    }

    export interface WritableStream extends EventEmitter {
        writable: boolean;
        write(buffer: Buffer|string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
    }

    export interface ReadWriteStream extends ReadableStream, WritableStream {}

    export interface Events extends EventEmitter { }

    export interface Domain extends Events {
        run(fn: Function): void;
        add(emitter: Events): void;
        remove(emitter: Events): void;
        bind(cb: (err: Error, data: any) => any): any;
        intercept(cb: (data: any) => any): any;
        dispose(): void;

        addListener(event: string, listener: Function): this;
        on(event: string, listener: Function): this;
        once(event: string, listener: Function): this;
        removeListener(event: string, listener: Function): this;
        removeAllListeners(event?: string): this;
    }

    export interface Process extends EventEmitter {
        stdout: WritableStream;
        stderr: WritableStream;
        stdin: ReadableStream;
        argv: string[];
        execArgv: string[];
        execPath: string;
        abort(): void;
        chdir(directory: string): void;
        cwd(): string;
        env: any;
        exit(code?: number): void;
        getgid(): number;
        setgid(id: number): void;
        setgid(id: string): void;
        getuid(): number;
        setuid(id: number): void;
        setuid(id: string): void;
        version: string;
        versions: {
            http_parser: string;
            node: string;
            v8: string;
            ares: string;
            uv: string;
            zlib: string;
            openssl: string;
        };
        config: {
            target_defaults: {
                cflags: any[];
                default_configuration: string;
                defines: string[];
                include_dirs: string[];
                libraries: string[];
            };
            variables: {
                clang: number;
                host_arch: string;
                node_install_npm: boolean;
                node_install_waf: boolean;
                node_prefix: string;
                node_shared_openssl: boolean;
                node_shared_v8: boolean;
                node_shared_zlib: boolean;
                node_use_dtrace: boolean;
                node_use_etw: boolean;
                node_use_openssl: boolean;
                target_arch: string;
                v8_no_strict_aliasing: number;
                v8_use_snapshot: boolean;
                visibility: string;
            };
        };
        kill(pid:number, signal?: string|number): void;
        pid: number;
        title: string;
        arch: string;
        platform: string;
        memoryUsage(): { rss: number; heapTotal: number; heapUsed: number; };
        nextTick(callback: Function): void;
        umask(mask?: number): number;
        uptime(): number;
        hrtime(time?:number[]): number[];
        domain: Domain;

        // Worker
        send?(message: any, sendHandle?: any): void;
        disconnect(): void;
        connected: boolean;
    }

    export interface Global {
        Array: typeof Array;
        ArrayBuffer: typeof ArrayBuffer;
        Boolean: typeof Boolean;
        Buffer: typeof Buffer;
        DataView: typeof DataView;
        Date: typeof Date;
        Error: typeof Error;
        EvalError: typeof EvalError;
        Float32Array: typeof Float32Array;
        Float64Array: typeof Float64Array;
        Function: typeof Function;
        GLOBAL: Global;
        Infinity: typeof Infinity;
        Int16Array: typeof Int16Array;
        Int32Array: typeof Int32Array;
        Int8Array: typeof Int8Array;
        Intl: typeof Intl;
        JSON: typeof JSON;
        Map: MapConstructor;
        Math: typeof Math;
        NaN: typeof NaN;
        Number: typeof Number;
        Object: typeof Object;
        Promise: Function;
        RangeError: typeof RangeError;
        ReferenceError: typeof ReferenceError;
        RegExp: typeof RegExp;
        Set: SetConstructor;
        String: typeof String;
        Symbol: Function;
        SyntaxError: typeof SyntaxError;
        TypeError: typeof TypeError;
        URIError: typeof URIError;
        Uint16Array: typeof Uint16Array;
        Uint32Array: typeof Uint32Array;
        Uint8Array: typeof Uint8Array;
        Uint8ClampedArray: Function;
        WeakMap: WeakMapConstructor;
        WeakSet: WeakSetConstructor;
        clearImmediate: (immediateId: any) => void;
        clearInterval: (intervalId: NodeJS.Timer) => void;
        clearTimeout: (timeoutId: NodeJS.Timer) => void;
        console: typeof console;
        decodeURI: typeof decodeURI;
        decodeURIComponent: typeof decodeURIComponent;
        encodeURI: typeof encodeURI;
        encodeURIComponent: typeof encodeURIComponent;
        escape: (str: string) => string;
        eval: typeof eval;
        global: Global;
        isFinite: typeof isFinite;
        isNaN: typeof isNaN;
        parseFloat: typeof parseFloat;
        parseInt: typeof parseInt;
        process: Process;
        root: Global;
        setImmediate: (callback: (...args: any[]) => void, ...args: any[]) => any;
        setInterval: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => NodeJS.Timer;
        setTimeout: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => NodeJS.Timer;
        undefined: typeof undefined;
        unescape: (str: string) => string;
        gc: () => void;
        v8debug?: any;
    }

    export interface Timer {
        ref() : void;
        unref() : void;
    }
}

/**
 * @deprecated
 */
interface NodeBuffer {
    [index: number]: number;
    write(string: string, offset?: number, length?: number, encoding?: string): number;
    toString(encoding?: string, start?: number, end?: number): string;
    toJSON(): any;
    length: number;
    equals(otherBuffer: Buffer): boolean;
    compare(otherBuffer: Buffer): number;
    copy(targetBuffer: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    slice(start?: number, end?: number): Buffer;
    writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUInt8(offset: number, noAssert?: boolean): number;
    readUInt16LE(offset: number, noAssert?: boolean): number;
    readUInt16BE(offset: number, noAssert?: boolean): number;
    readUInt32LE(offset: number, noAssert?: boolean): number;
    readUInt32BE(offset: number, noAssert?: boolean): number;
    readInt8(offset: number, noAssert?: boolean): number;
    readInt16LE(offset: number, noAssert?: boolean): number;
    readInt16BE(offset: number, noAssert?: boolean): number;
    readInt32LE(offset: number, noAssert?: boolean): number;
    readInt32BE(offset: number, noAssert?: boolean): number;
    readFloatLE(offset: number, noAssert?: boolean): number;
    readFloatBE(offset: number, noAssert?: boolean): number;
    readDoubleLE(offset: number, noAssert?: boolean): number;
    readDoubleBE(offset: number, noAssert?: boolean): number;
    writeUInt8(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt8(value: number, offset: number, noAssert?: boolean): number;
    writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;
    fill(value: any, offset?: number, end?: number): Buffer;
    indexOf(value: string | number | Buffer, byteOffset?: number): number;
}

/************************************************
*                                               *
*                   MODULES                     *
*                                               *
************************************************/
declare module "buffer" {
    export var INSPECT_MAX_BYTES: number;
    var BuffType: typeof Buffer;
    var SlowBuffType: typeof SlowBuffer;
    export { BuffType as Buffer, SlowBuffType as SlowBuffer };
}

declare module "querystring" {
    export interface StringifyOptions {
        encodeURIComponent?: Function;
    }

    export interface ParseOptions {
        maxKeys?: number;
        decodeURIComponent?: Function;
    }

    export function stringify<T>(obj: T, sep?: string, eq?: string, options?: StringifyOptions): string;
    export function parse(str: string, sep?: string, eq?: string, options?: ParseOptions): any;
    export function parse<T extends {}>(str: string, sep?: string, eq?: string, options?: ParseOptions): T;
    export function escape(str: string): string;
    export function unescape(str: string): string;
}

declare module "events" {
    export class EventEmitter implements NodeJS.EventEmitter {
        static EventEmitter: EventEmitter;
        static listenerCount(emitter: EventEmitter, event: string): number; // deprecated
        static defaultMaxListeners: number;

        addListener(event: string, listener: Function): this;
        on(event: string, listener: Function): this;
        once(event: string, listener: Function): this;
        removeListener(event: string, listener: Function): this;
        removeAllListeners(event?: string): this;
        setMaxListeners(n: number): this;
        getMaxListeners(): number;
        listeners(event: string): Function[];
        emit(event: string, ...args: any[]): boolean;
        listenerCount(type: string): number;
    }
}

declare module "http" {
    import * as events from "events";
    import * as net from "net";
    import * as stream from "stream";

    export interface RequestOptions {
        protocol?: string;
        host?: string;
        hostname?: string;
        family?: number;
        port?: number;
        localAddress?: string;
        socketPath?: string;
        method?: string;
        path?: string;
        headers?: { [key: string]: any };
        auth?: string;
        agent?: Agent|boolean;
    }

    export interface Server extends events.EventEmitter {
        listen(port: number, hostname?: string, backlog?: number, callback?: Function): Server;
        listen(port: number, hostname?: string, callback?: Function): Server;
        listen(path: string, callback?: Function): Server;
        listen(handle: any, listeningListener?: Function): Server;
        close(cb?: any): Server;
        address(): { port: number; family: string; address: string; };
        maxHeadersCount: number;
    }
    /**
     * @deprecated Use IncomingMessage
     */
    export interface ServerRequest extends IncomingMessage {
        connection: net.Socket;
    }
    export interface ServerResponse extends events.EventEmitter, stream.Writable {
        // Extended base methods
        write(buffer: Buffer): boolean;
        write(buffer: Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        write(str: string, encoding?: string, fd?: string): boolean;

        writeContinue(): void;
        writeHead(statusCode: number, reasonPhrase?: string, headers?: any): void;
        writeHead(statusCode: number, headers?: any): void;
        statusCode: number;
        statusMessage: string;
        headersSent: boolean;
        setHeader(name: string, value: string | string[]): void;
        sendDate: boolean;
        getHeader(name: string): string;
        removeHeader(name: string): void;
        write(chunk: any, encoding?: string): any;
        addTrailers(headers: any): void;

        // Extended base methods
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
        end(data?: any, encoding?: string): void;
    }
    export interface ClientRequest extends events.EventEmitter, stream.Writable {
        // Extended base methods
        write(buffer: Buffer): boolean;
        write(buffer: Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        write(str: string, encoding?: string, fd?: string): boolean;

        write(chunk: any, encoding?: string): void;
        abort(): void;
        setTimeout(timeout: number, callback?: Function): void;
        setNoDelay(noDelay?: boolean): void;
        setSocketKeepAlive(enable?: boolean, initialDelay?: number): void;

        // Extended base methods
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
        end(data?: any, encoding?: string): void;
    }
    export interface IncomingMessage extends events.EventEmitter, stream.Readable {
        httpVersion: string;
        headers: any;
        rawHeaders: string[];
        trailers: any;
        rawTrailers: any;
        setTimeout(msecs: number, callback: Function): NodeJS.Timer;
        /**
         * Only valid for request obtained from http.Server.
         */
        method?: string;
        /**
         * Only valid for request obtained from http.Server.
         */
        url?: string;
        /**
         * Only valid for response obtained from http.ClientRequest.
         */
        statusCode?: number;
        /**
         * Only valid for response obtained from http.ClientRequest.
         */
        statusMessage?: string;
        socket: net.Socket;
    }
    /**
     * @deprecated Use IncomingMessage
     */
    export interface ClientResponse extends IncomingMessage { }

	export interface AgentOptions {
		/**
		 * Keep sockets around in a pool to be used by other requests in the future. Default = false
		 */
		keepAlive?: boolean;
		/**
		 * When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. Default = 1000.
		 * Only relevant if keepAlive is set to true.
		 */
		keepAliveMsecs?: number;
		/**
		 * Maximum number of sockets to allow per host. Default for Node 0.10 is 5, default for Node 0.12 is Infinity
		 */
		maxSockets?: number;
		/**
		 * Maximum number of sockets to leave open in a free state. Only relevant if keepAlive is set to true. Default = 256.
		 */
		maxFreeSockets?: number;
	}

    export class Agent {
		maxSockets: number;
		sockets: any;
		requests: any;

		constructor(opts?: AgentOptions);

		/**
		 * Destroy any sockets that are currently in use by the agent.
		 * It is usually not necessary to do this. However, if you are using an agent with KeepAlive enabled,
		 * then it is best to explicitly shut down the agent when you know that it will no longer be used. Otherwise,
		 * sockets may hang open for quite a long time before the server terminates them.
		 */
		destroy(): void;
	}

    export var METHODS: string[];

    export var STATUS_CODES: {
        [errorCode: number]: string;
        [errorCode: string]: string;
    };
    export function createServer(requestListener?: (request: IncomingMessage, response: ServerResponse) =>void ): Server;
    export function createClient(port?: number, host?: string): any;
    export function request(options: RequestOptions, callback?: (res: IncomingMessage) => void): ClientRequest;
    export function get(options: any, callback?: (res: IncomingMessage) => void): ClientRequest;
    export var globalAgent: Agent;
}

declare module "cluster" {
    import * as child from "child_process";
    import * as events from "events";

    export interface ClusterSettings {
        exec?: string;
        args?: string[];
        silent?: boolean;
    }

    export interface Address {
        address: string;
        port: number;
        addressType: string;
    }

    export class Worker extends events.EventEmitter {
        id: string;
        process: child.ChildProcess;
        suicide: boolean;
        send(message: any, sendHandle?: any): void;
        kill(signal?: string): void;
        destroy(signal?: string): void;
        disconnect(): void;
    }

    export var settings: ClusterSettings;
    export var isMaster: boolean;
    export var isWorker: boolean;
    export function setupMaster(settings?: ClusterSettings): void;
    export function fork(env?: any): Worker;
    export function disconnect(callback?: Function): void;
    export var worker: Worker;
    export var workers: Worker[];

    // Event emitter
    export function addListener(event: string, listener: Function): void;
    export function on(event: "disconnect", listener: (worker: Worker) => void): void;
    export function on(event: "exit", listener: (worker: Worker, code: number, signal: string) => void): void;
    export function on(event: "fork", listener: (worker: Worker) => void): void;
    export function on(event: "listening", listener: (worker: Worker, address: any) => void): void;
    export function on(event: "message", listener: (worker: Worker, message: any) => void): void;
    export function on(event: "online", listener: (worker: Worker) => void): void;
    export function on(event: "setup", listener: (settings: any) => void): void;
    export function on(event: string, listener: Function): any;
    export function once(event: string, listener: Function): void;
    export function removeListener(event: string, listener: Function): void;
    export function removeAllListeners(event?: string): void;
    export function setMaxListeners(n: number): void;
    export function listeners(event: string): Function[];
    export function emit(event: string, ...args: any[]): boolean;
}

declare module "zlib" {
    import * as stream from "stream";
    export interface ZlibOptions { chunkSize?: number; windowBits?: number; level?: number; memLevel?: number; strategy?: number; dictionary?: any; }

    export interface Gzip extends stream.Transform { }
    export interface Gunzip extends stream.Transform { }
    export interface Deflate extends stream.Transform { }
    export interface Inflate extends stream.Transform { }
    export interface DeflateRaw extends stream.Transform { }
    export interface InflateRaw extends stream.Transform { }
    export interface Unzip extends stream.Transform { }

    export function createGzip(options?: ZlibOptions): Gzip;
    export function createGunzip(options?: ZlibOptions): Gunzip;
    export function createDeflate(options?: ZlibOptions): Deflate;
    export function createInflate(options?: ZlibOptions): Inflate;
    export function createDeflateRaw(options?: ZlibOptions): DeflateRaw;
    export function createInflateRaw(options?: ZlibOptions): InflateRaw;
    export function createUnzip(options?: ZlibOptions): Unzip;

    export function deflate(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function deflateSync(buf: Buffer, options?: ZlibOptions): any;
    export function deflateRaw(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function deflateRawSync(buf: Buffer, options?: ZlibOptions): any;
    export function gzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function gzipSync(buf: Buffer, options?: ZlibOptions): any;
    export function gunzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function gunzipSync(buf: Buffer, options?: ZlibOptions): any;
    export function inflate(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function inflateSync(buf: Buffer, options?: ZlibOptions): any;
    export function inflateRaw(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function inflateRawSync(buf: Buffer, options?: ZlibOptions): any;
    export function unzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
    export function unzipSync(buf: Buffer, options?: ZlibOptions): any;

    // Constants
    export var Z_NO_FLUSH: number;
    export var Z_PARTIAL_FLUSH: number;
    export var Z_SYNC_FLUSH: number;
    export var Z_FULL_FLUSH: number;
    export var Z_FINISH: number;
    export var Z_BLOCK: number;
    export var Z_TREES: number;
    export var Z_OK: number;
    export var Z_STREAM_END: number;
    export var Z_NEED_DICT: number;
    export var Z_ERRNO: number;
    export var Z_STREAM_ERROR: number;
    export var Z_DATA_ERROR: number;
    export var Z_MEM_ERROR: number;
    export var Z_BUF_ERROR: number;
    export var Z_VERSION_ERROR: number;
    export var Z_NO_COMPRESSION: number;
    export var Z_BEST_SPEED: number;
    export var Z_BEST_COMPRESSION: number;
    export var Z_DEFAULT_COMPRESSION: number;
    export var Z_FILTERED: number;
    export var Z_HUFFMAN_ONLY: number;
    export var Z_RLE: number;
    export var Z_FIXED: number;
    export var Z_DEFAULT_STRATEGY: number;
    export var Z_BINARY: number;
    export var Z_TEXT: number;
    export var Z_ASCII: number;
    export var Z_UNKNOWN: number;
    export var Z_DEFLATED: number;
    export var Z_NULL: number;
}

declare module "os" {
    export interface CpuInfo {
        model: string;
        speed: number;
        times: {
            user: number;
            nice: number;
            sys: number;
            idle: number;
            irq: number;
        };
    }

    export interface NetworkInterfaceInfo {
        address: string;
        netmask: string;
        family: string;
        mac: string;
        internal: boolean;
    }

    export function tmpdir(): string;
    export function homedir(): string;
    export function endianness(): string;
    export function hostname(): string;
    export function type(): string;
    export function platform(): string;
    export function arch(): string;
    export function release(): string;
    export function uptime(): number;
    export function loadavg(): number[];
    export function totalmem(): number;
    export function freemem(): number;
    export function cpus(): CpuInfo[];
    export function networkInterfaces(): {[index: string]: NetworkInterfaceInfo[]};
    export var EOL: string;
}

declare module "https" {
    import * as tls from "tls";
    import * as events from "events";
    import * as http from "http";

    export interface ServerOptions {
        pfx?: any;
        key?: any;
        passphrase?: string;
        cert?: any;
        ca?: any;
        crl?: any;
        ciphers?: string;
        honorCipherOrder?: boolean;
        requestCert?: boolean;
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;
        SNICallback?: (servername: string) => any;
    }

    export interface RequestOptions extends http.RequestOptions{
        pfx?: any;
        key?: any;
        passphrase?: string;
        cert?: any;
        ca?: any;
        ciphers?: string;
        rejectUnauthorized?: boolean;
        secureProtocol?: string;
    }

    export interface Agent {
        maxSockets: number;
        sockets: any;
        requests: any;
    }
    export var Agent: {
        new (options?: RequestOptions): Agent;
    };
    export interface Server extends tls.Server { }
    export function createServer(options: ServerOptions, requestListener?: Function): Server;
    export function request(options: RequestOptions, callback?: (res: http.IncomingMessage) =>void ): http.ClientRequest;
    export function get(options: RequestOptions, callback?: (res: http.IncomingMessage) =>void ): http.ClientRequest;
    export var globalAgent: Agent;
}

declare module "punycode" {
    export function decode(string: string): string;
    export function encode(string: string): string;
    export function toUnicode(domain: string): string;
    export function toASCII(domain: string): string;
    export var ucs2: ucs2;
    interface ucs2 {
        decode(string: string): number[];
        encode(codePoints: number[]): string;
    }
    export var version: any;
}

declare module "repl" {
    import * as stream from "stream";
    import * as events from "events";

    export interface ReplOptions {
        prompt?: string;
        input?: NodeJS.ReadableStream;
        output?: NodeJS.WritableStream;
        terminal?: boolean;
        eval?: Function;
        useColors?: boolean;
        useGlobal?: boolean;
        ignoreUndefined?: boolean;
        writer?: Function;
    }
    export function start(options: ReplOptions): events.EventEmitter;
}

declare module "readline" {
    import * as events from "events";
    import * as stream from "stream";

    export interface Key {
        sequence?: string;
        name?: string;
        ctrl?: boolean;
        meta?: boolean;
        shift?: boolean;
    }

    export interface ReadLine extends events.EventEmitter {
        setPrompt(prompt: string): void;
        prompt(preserveCursor?: boolean): void;
        question(query: string, callback: (answer: string) => void): void;
        pause(): ReadLine;
        resume(): ReadLine;
        close(): void;
        write(data: string|Buffer, key?: Key): void;
    }

    export interface Completer {
        (line: string): CompleterResult;
        (line: string, callback: (err: any, result: CompleterResult) => void): any;
    }

    export interface CompleterResult {
        completions: string[];
        line: string;
    }

    export interface ReadLineOptions {
        input: NodeJS.ReadableStream;
        output?: NodeJS.WritableStream;
        completer?: Completer;
        terminal?: boolean;
        historySize?: number;
    }

    export function createInterface(input: NodeJS.ReadableStream, output?: NodeJS.WritableStream, completer?: Completer, terminal?: boolean): ReadLine;
    export function createInterface(options: ReadLineOptions): ReadLine;

    export function cursorTo(stream: NodeJS.WritableStream, x: number, y: number): void;
    export function moveCursor(stream: NodeJS.WritableStream, dx: number|string, dy: number|string): void;
    export function clearLine(stream: NodeJS.WritableStream, dir: number): void;
    export function clearScreenDown(stream: NodeJS.WritableStream): void;
}

declare module "vm" {
    export interface Context { }
    export interface Script {
        runInThisContext(): void;
        runInNewContext(sandbox?: Context): void;
    }
    export function runInThisContext(code: string, filename?: string): void;
    export function runInNewContext(code: string, sandbox?: Context, filename?: string): void;
    export function runInContext(code: string, context: Context, filename?: string): void;
    export function createContext(initSandbox?: Context): Context;
    export function createScript(code: string, filename?: string): Script;
}

declare module "child_process" {
    import * as events from "events";
    import * as stream from "stream";

    export interface ChildProcess extends events.EventEmitter {
        stdin:  stream.Writable;
        stdout: stream.Readable;
        stderr: stream.Readable;
        stdio: (stream.Readable|stream.Writable)[];
        pid: number;
        kill(signal?: string): void;
        send(message: any, sendHandle?: any): void;
        disconnect(): void;
        unref(): void;
    }

    export function spawn(command: string, args?: string[], options?: {
        cwd?: string;
        stdio?: any;
        custom?: any;
        env?: any;
        detached?: boolean;
    }): ChildProcess;
    export function exec(command: string, options: {
        cwd?: string;
        stdio?: any;
        customFds?: any;
        env?: any;
        encoding?: string;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
    }, callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    export function exec(command: string, callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    export function execFile(file: string,
        callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    export function execFile(file: string, args?: string[],
        callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    export function execFile(file: string, args?: string[], options?: {
        cwd?: string;
        stdio?: any;
        customFds?: any;
        env?: any;
        encoding?: string;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
    }, callback?: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
    export function fork(modulePath: string, args?: string[], options?: {
        cwd?: string;
        env?: any;
        execPath?: string;
        execArgv?: string[];
        silent?: boolean;
        uid?: number;
        gid?: number;
    }): ChildProcess;
    export function spawnSync(command: string, args?: string[], options?: {
        cwd?: string;
        input?: string | Buffer;
        stdio?: any;
        env?: any;
        uid?: number;
        gid?: number;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
        encoding?: string;
    }): {
        pid: number;
        output: string[];
        stdout: string | Buffer;
        stderr: string | Buffer;
        status: number;
        signal: string;
        error: Error;
    };
    export function execSync(command: string, options?: {
        cwd?: string;
        input?: string|Buffer;
        stdio?: any;
        env?: any;
        uid?: number;
        gid?: number;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
        encoding?: string;
    }): string | Buffer;
    export function execFileSync(command: string, args?: string[], options?: {
        cwd?: string;
        input?: string|Buffer;
        stdio?: any;
        env?: any;
        uid?: number;
        gid?: number;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
        encoding?: string;
    }): string | Buffer;
}

declare module "url" {
    export interface Url {
        href?: string;
        protocol?: string;
        auth?: string;
        hostname?: string;
        port?: string;
        host?: string;
        pathname?: string;
        search?: string;
        query?: any; // string | Object
        slashes?: boolean;
        hash?: string;
        path?: string;
    }

    export function parse(urlStr: string, parseQueryString?: boolean , slashesDenoteHost?: boolean ): Url;
    export function format(url: Url): string;
    export function resolve(from: string, to: string): string;
}

declare module "dns" {
    export function lookup(domain: string, family: number, callback: (err: Error, address: string, family: number) =>void ): string;
    export function lookup(domain: string, callback: (err: Error, address: string, family: number) =>void ): string;
    export function resolve(domain: string, rrtype: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolve(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolve4(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolve6(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveMx(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveTxt(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveSrv(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveNs(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveCname(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function reverse(ip: string, callback: (err: Error, domains: string[]) =>void ): string[];
}

declare module "net" {
    import * as stream from "stream";

    export interface Socket extends stream.Duplex {
        // Extended base methods
        write(buffer: Buffer): boolean;
        write(buffer: Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        write(str: string, encoding?: string, fd?: string): boolean;

        connect(port: number, host?: string, connectionListener?: Function): void;
        connect(path: string, connectionListener?: Function): void;
        bufferSize: number;
        setEncoding(encoding?: string): void;
        write(data: any, encoding?: string, callback?: Function): void;
        destroy(): void;
        pause(): void;
        resume(): void;
        setTimeout(timeout: number, callback?: Function): void;
        setNoDelay(noDelay?: boolean): void;
        setKeepAlive(enable?: boolean, initialDelay?: number): void;
        address(): { port: number; family: string; address: string; };
        unref(): void;
        ref(): void;

        remoteAddress: string;
        remoteFamily: string;
        remotePort: number;
        localAddress: string;
        localPort: number;
        bytesRead: number;
        bytesWritten: number;

        // Extended base methods
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
        end(data?: any, encoding?: string): void;
    }

    export var Socket: {
        new (options?: { fd?: string; type?: string; allowHalfOpen?: boolean; }): Socket;
    };

    export interface Server extends Socket {
        listen(port: number, host?: string, backlog?: number, listeningListener?: Function): Server;
        listen(path: string, listeningListener?: Function): Server;
        listen(handle: any, listeningListener?: Function): Server;
        close(callback?: Function): Server;
        address(): { port: number; family: string; address: string; };
        maxConnections: number;
        connections: number;
    }
    export function createServer(connectionListener?: (socket: Socket) =>void ): Server;
    export function createServer(options?: { allowHalfOpen?: boolean; }, connectionListener?: (socket: Socket) =>void ): Server;
    export function connect(options: { port: number, host?: string, localAddress? : string, localPort? : string, family? : number, allowHalfOpen?: boolean; }, connectionListener?: Function): Socket;
    export function connect(port: number, host?: string, connectionListener?: Function): Socket;
    export function connect(path: string, connectionListener?: Function): Socket;
    export function createConnection(options: { port: number, host?: string, localAddress? : string, localPort? : string, family? : number, allowHalfOpen?: boolean; }, connectionListener?: Function): Socket;
    export function createConnection(port: number, host?: string, connectionListener?: Function): Socket;
    export function createConnection(path: string, connectionListener?: Function): Socket;
    export function isIP(input: string): number;
    export function isIPv4(input: string): boolean;
    export function isIPv6(input: string): boolean;
}

declare module "dgram" {
    import * as events from "events";

    interface RemoteInfo {
        address: string;
        port: number;
        size: number;
    }

    interface AddressInfo {
        address: string;
        family: string;
        port: number;
    }

    export function createSocket(type: string, callback?: (msg: Buffer, rinfo: RemoteInfo) => void): Socket;

    interface Socket extends events.EventEmitter {
        send(buf: Buffer, offset: number, length: number, port: number, address: string, callback?: (error: Error, bytes: number) => void): void;
        bind(port: number, address?: string, callback?: () => void): void;
        close(): void;
        address(): AddressInfo;
        setBroadcast(flag: boolean): void;
        setMulticastTTL(ttl: number): void;
        setMulticastLoopback(flag: boolean): void;
        addMembership(multicastAddress: string, multicastInterface?: string): void;
        dropMembership(multicastAddress: string, multicastInterface?: string): void;
    }
}

declare module "fs" {
    import * as stream from "stream";
    import * as events from "events";

    interface Stats {
        isFile(): boolean;
        isDirectory(): boolean;
        isBlockDevice(): boolean;
        isCharacterDevice(): boolean;
        isSymbolicLink(): boolean;
        isFIFO(): boolean;
        isSocket(): boolean;
        dev: number;
        ino: number;
        mode: number;
        nlink: number;
        uid: number;
        gid: number;
        rdev: number;
        size: number;
        blksize: number;
        blocks: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
        birthtime: Date;
    }

    interface FSWatcher extends events.EventEmitter {
        close(): void;
    }

    export interface ReadStream extends stream.Readable {
        close(): void;
    }
    export interface WriteStream extends stream.Writable {
        close(): void;
        bytesWritten: number;
    }

    /**
     * Asynchronous rename.
     * @param oldPath
     * @param newPath
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function rename(oldPath: string, newPath: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /**
     * Synchronous rename
     * @param oldPath
     * @param newPath
     */
    export function renameSync(oldPath: string, newPath: string): void;
    export function truncate(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function truncate(path: string, len: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function truncateSync(path: string, len?: number): void;
    export function ftruncate(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function ftruncate(fd: number, len: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function ftruncateSync(fd: number, len?: number): void;
    export function chown(path: string, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function chownSync(path: string, uid: number, gid: number): void;
    export function fchown(fd: number, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function fchownSync(fd: number, uid: number, gid: number): void;
    export function lchown(path: string, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function lchownSync(path: string, uid: number, gid: number): void;
    export function chmod(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function chmod(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function chmodSync(path: string, mode: number): void;
    export function chmodSync(path: string, mode: string): void;
    export function fchmod(fd: number, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function fchmod(fd: number, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function fchmodSync(fd: number, mode: number): void;
    export function fchmodSync(fd: number, mode: string): void;
    export function lchmod(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function lchmod(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function lchmodSync(path: string, mode: number): void;
    export function lchmodSync(path: string, mode: string): void;
    export function stat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
    export function lstat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
    export function fstat(fd: number, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
    export function statSync(path: string): Stats;
    export function lstatSync(path: string): Stats;
    export function fstatSync(fd: number): Stats;
    export function link(srcpath: string, dstpath: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function linkSync(srcpath: string, dstpath: string): void;
    export function symlink(srcpath: string, dstpath: string, type?: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function symlinkSync(srcpath: string, dstpath: string, type?: string): void;
    export function readlink(path: string, callback?: (err: NodeJS.ErrnoException, linkString: string) => any): void;
    export function readlinkSync(path: string): string;
    export function realpath(path: string, callback?: (err: NodeJS.ErrnoException, resolvedPath: string) => any): void;
    export function realpath(path: string, cache: {[path: string]: string}, callback: (err: NodeJS.ErrnoException, resolvedPath: string) =>any): void;
    export function realpathSync(path: string, cache?: { [path: string]: string }): string;
    /*
     * Asynchronous unlink - deletes the file specified in {path}
     *
     * @param path
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function unlink(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Synchronous unlink - deletes the file specified in {path}
     *
     * @param path
     */
    export function unlinkSync(path: string): void;
    /*
     * Asynchronous rmdir - removes the directory specified in {path}
     *
     * @param path
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function rmdir(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Synchronous rmdir - removes the directory specified in {path}
     *
     * @param path
     */
    export function rmdirSync(path: string): void;
    /*
     * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function mkdir(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function mkdir(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Asynchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function mkdir(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
    /*
     * Synchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function mkdirSync(path: string, mode?: number): void;
    /*
     * Synchronous mkdir - creates the directory specified in {path}.  Parameter {mode} defaults to 0777.
     *
     * @param path
     * @param mode
     * @param callback No arguments other than a possible exception are given to the completion callback.
     */
    export function mkdirSync(path: string, mode?: string): void;
    export function readdir(path: string, callback?: (err: NodeJS.ErrnoException, files: string[]) => void): void;
    export function readdirSync(path: string): string[];
    export function close(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function closeSync(fd: number): void;
    export function open(path: string, flags: string, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
    export function open(path: string, flags: string, mode: number, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
    export function open(path: string, flags: string, mode: string, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
    export function openSync(path: string, flags: string, mode?: number): number;
    export function openSync(path: string, flags: string, mode?: string): number;
    export function utimes(path: string, atime: number, mtime: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function utimes(path: string, atime: Date, mtime: Date, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function utimesSync(path: string, atime: number, mtime: number): void;
    export function utimesSync(path: string, atime: Date, mtime: Date): void;
    export function futimes(fd: number, atime: number, mtime: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function futimes(fd: number, atime: Date, mtime: Date, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function futimesSync(fd: number, atime: number, mtime: number): void;
    export function futimesSync(fd: number, atime: Date, mtime: Date): void;
    export function fsync(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
    export function fsyncSync(fd: number): void;
    export function write(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
    export function write(fd: number, buffer: Buffer, offset: number, length: number, callback?: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
    export function write(fd: number, data: any, callback?: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
    export function write(fd: number, data: any, offset: number, callback?: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
    export function write(fd: number, data: any, offset: number, encoding: string, callback?: (err: NodeJS.ErrnoException, written: number, str: string) => void): void;
    export function writeSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
    export function read(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, bytesRead: number, buffer: Buffer) => void): void;
    export function readSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param encoding
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    export function readFile(filename: string, encoding: string, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFile returns a string; otherwise it returns a Buffer.
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    export function readFile(filename: string, options: { encoding: string; flag?: string; }, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFile returns a string; otherwise it returns a Buffer.
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    export function readFile(filename: string, options: { flag?: string; }, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
    /*
     * Asynchronous readFile - Asynchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param callback - The callback is passed two arguments (err, data), where data is the contents of the file.
     */
    export function readFile(filename: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
    /*
     * Synchronous readFile - Synchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param encoding
     */
    export function readFileSync(filename: string, encoding: string): string;
    /*
     * Synchronous readFile - Synchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFileSync returns a string; otherwise it returns a Buffer.
     */
    export function readFileSync(filename: string, options: { encoding: string; flag?: string; }): string;
    /*
     * Synchronous readFile - Synchronously reads the entire contents of a file.
     *
     * @param fileName
     * @param options An object with optional {encoding} and {flag} properties.  If {encoding} is specified, readFileSync returns a string; otherwise it returns a Buffer.
     */
    export function readFileSync(filename: string, options?: { flag?: string; }): Buffer;
    export function writeFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function writeFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function writeFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
    export function writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
    export function appendFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function appendFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function appendFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
    export function appendFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
    export function appendFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
    export function watchFile(filename: string, listener: (curr: Stats, prev: Stats) => void): void;
    export function watchFile(filename: string, options: { persistent?: boolean; interval?: number; }, listener: (curr: Stats, prev: Stats) => void): void;
    export function unwatchFile(filename: string, listener?: (curr: Stats, prev: Stats) => void): void;
    export function watch(filename: string, listener?: (event: string, filename: string) => any): FSWatcher;
    export function watch(filename: string, options: { persistent?: boolean; }, listener?: (event: string, filename: string) => any): FSWatcher;
    export function exists(path: string, callback?: (exists: boolean) => void): void;
    export function existsSync(path: string): boolean;
    /** Constant for fs.access(). File is visible to the calling process. */
    export var F_OK: number;
    /** Constant for fs.access(). File can be read by the calling process. */
    export var R_OK: number;
    /** Constant for fs.access(). File can be written by the calling process. */
    export var W_OK: number;
    /** Constant for fs.access(). File can be executed by the calling process. */
    export var X_OK: number;
    /** Tests a user's permissions for the file specified by path. */
    export function access(path: string, callback: (err: NodeJS.ErrnoException) => void): void;
    export function access(path: string, mode: number, callback: (err: NodeJS.ErrnoException) => void): void;
    /** Synchronous version of fs.access. This throws if any accessibility checks fail, and does nothing otherwise. */
    export function accessSync(path: string, mode ?: number): void;
    export function createReadStream(path: string, options?: {
        flags?: string;
        encoding?: string;
        fd?: number;
        mode?: number;
        autoClose?: boolean;
    }): ReadStream;
    export function createWriteStream(path: string, options?: {
        flags?: string;
        encoding?: string;
        fd?: number;
        mode?: number;
    }): WriteStream;
}

declare module "path" {

    /**
     * A parsed path object generated by path.parse() or consumed by path.format().
     */
    export interface ParsedPath {
        /**
         * The root of the path such as '/' or 'c:\'
         */
        root: string;
        /**
         * The full directory path such as '/home/user/dir' or 'c:\path\dir'
         */
        dir: string;
        /**
         * The file name including extension (if any) such as 'index.html'
         */
        base: string;
        /**
         * The file extension (if any) such as '.html'
         */
        ext: string;
        /**
         * The file name without extension (if any) such as 'index'
         */
        name: string;
    }

    /**
     * Normalize a string path, reducing '..' and '.' parts.
     * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
     *
     * @param p string path to normalize.
     */
    export function normalize(p: string): string;
    /**
     * Join all arguments together and normalize the resulting path.
     * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
     *
     * @param paths string paths to join.
     */
    export function join(...paths: any[]): string;
    /**
     * Join all arguments together and normalize the resulting path.
     * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
     *
     * @param paths string paths to join.
     */
    export function join(...paths: string[]): string;
    /**
     * The right-most parameter is considered {to}.  Other parameters are considered an array of {from}.
     *
     * Starting from leftmost {from} paramter, resolves {to} to an absolute path.
     *
     * If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.
     *
     * @param pathSegments string paths to join.  Non-string arguments are ignored.
     */
    export function resolve(...pathSegments: any[]): string;
    /**
     * Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.
     *
     * @param path path to test.
     */
    export function isAbsolute(path: string): boolean;
    /**
     * Solve the relative path from {from} to {to}.
     * At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.
     *
     * @param from
     * @param to
     */
    export function relative(from: string, to: string): string;
    /**
     * Return the directory name of a path. Similar to the Unix dirname command.
     *
     * @param p the path to evaluate.
     */
    export function dirname(p: string): string;
    /**
     * Return the last portion of a path. Similar to the Unix basename command.
     * Often used to extract the file name from a fully qualified path.
     *
     * @param p the path to evaluate.
     * @param ext optionally, an extension to remove from the result.
     */
    export function basename(p: string, ext?: string): string;
    /**
     * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
     * If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
     *
     * @param p the path to evaluate.
     */
    export function extname(p: string): string;
    /**
     * The platform-specific file separator. '\\' or '/'.
     */
    export var sep: string;
    /**
     * The platform-specific file delimiter. ';' or ':'.
     */
    export var delimiter: string;
    /**
     * Returns an object from a path string - the opposite of format().
     *
     * @param pathString path to evaluate.
     */
    export function parse(pathString: string): ParsedPath;
    /**
     * Returns a path string from an object - the opposite of parse().
     *
     * @param pathString path to evaluate.
     */
    export function format(pathObject: ParsedPath): string;

    export module posix {
      export function normalize(p: string): string;
      export function join(...paths: any[]): string;
      export function resolve(...pathSegments: any[]): string;
      export function isAbsolute(p: string): boolean;
      export function relative(from: string, to: string): string;
      export function dirname(p: string): string;
      export function basename(p: string, ext?: string): string;
      export function extname(p: string): string;
      export var sep: string;
      export var delimiter: string;
      export function parse(p: string): ParsedPath;
      export function format(pP: ParsedPath): string;
    }

    export module win32 {
      export function normalize(p: string): string;
      export function join(...paths: any[]): string;
      export function resolve(...pathSegments: any[]): string;
      export function isAbsolute(p: string): boolean;
      export function relative(from: string, to: string): string;
      export function dirname(p: string): string;
      export function basename(p: string, ext?: string): string;
      export function extname(p: string): string;
      export var sep: string;
      export var delimiter: string;
      export function parse(p: string): ParsedPath;
      export function format(pP: ParsedPath): string;
    }
}

declare module "string_decoder" {
    export interface NodeStringDecoder {
        write(buffer: Buffer): string;
        detectIncompleteChar(buffer: Buffer): number;
    }
    export var StringDecoder: {
        new (encoding: string): NodeStringDecoder;
    };
}

declare module "tls" {
    import * as crypto from "crypto";
    import * as net from "net";
    import * as stream from "stream";

    var CLIENT_RENEG_LIMIT: number;
    var CLIENT_RENEG_WINDOW: number;

    export interface TlsOptions {
        host?: string;
        port?: number;
        pfx?: any;   //string or buffer
        key?: any;   //string or buffer
        passphrase?: string;
        cert?: any;
        ca?: any;    //string or buffer
        crl?: any;   //string or string array
        ciphers?: string;
        honorCipherOrder?: any;
        requestCert?: boolean;
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;  //array or Buffer;
        SNICallback?: (servername: string) => any;
    }

    export interface ConnectionOptions {
        host?: string;
        port?: number;
        socket?: net.Socket;
        pfx?: any;   //string | Buffer
        key?: any;   //string | Buffer
        passphrase?: string;
        cert?: any;  //string | Buffer
        ca?: any;    //Array of string | Buffer
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;  //Array of string | Buffer
        servername?: string;
    }

    export interface Server extends net.Server {
        // Extended base methods
        listen(port: number, host?: string, backlog?: number, listeningListener?: Function): Server;
        listen(path: string, listeningListener?: Function): Server;
        listen(handle: any, listeningListener?: Function): Server;

        listen(port: number, host?: string, callback?: Function): Server;
        close(): Server;
        address(): { port: number; family: string; address: string; };
        addContext(hostName: string, credentials: {
            key: string;
            cert: string;
            ca: string;
        }): void;
        maxConnections: number;
        connections: number;
    }

    export interface ClearTextStream extends stream.Duplex {
        authorized: boolean;
        authorizationError: Error;
        getPeerCertificate(): any;
        getCipher: {
            name: string;
            version: string;
        };
        address: {
            port: number;
            family: string;
            address: string;
        };
        remoteAddress: string;
        remotePort: number;
    }

    export interface SecurePair {
        encrypted: any;
        cleartext: any;
    }

    export interface SecureContextOptions {
        pfx?: any;   //string | buffer
        key?: any;   //string | buffer
        passphrase?: string;
        cert?: any;  // string | buffer
        ca?: any;    // string | buffer
        crl?: any;   // string | string[]
        ciphers?: string;
        honorCipherOrder?: boolean;
    }

    export interface SecureContext {
        context: any;
    }

    export function createServer(options: TlsOptions, secureConnectionListener?: (cleartextStream: ClearTextStream) =>void ): Server;
    export function connect(options: TlsOptions, secureConnectionListener?: () =>void ): ClearTextStream;
    export function connect(port: number, host?: string, options?: ConnectionOptions, secureConnectListener?: () =>void ): ClearTextStream;
    export function connect(port: number, options?: ConnectionOptions, secureConnectListener?: () =>void ): ClearTextStream;
    export function createSecurePair(credentials?: crypto.Credentials, isServer?: boolean, requestCert?: boolean, rejectUnauthorized?: boolean): SecurePair;
    export function createSecureContext(details: SecureContextOptions): SecureContext;
}

declare module "crypto" {
    export interface CredentialDetails {
        pfx: string;
        key: string;
        passphrase: string;
        cert: string;
        ca: any;    //string | string array
        crl: any;   //string | string array
        ciphers: string;
    }
    export interface Credentials { context?: any; }
    export function createCredentials(details: CredentialDetails): Credentials;
    export function createHash(algorithm: string): Hash;
    export function createHmac(algorithm: string, key: string): Hmac;
    export function createHmac(algorithm: string, key: Buffer): Hmac;
    export interface Hash {
        update(data: any, input_encoding?: string): Hash;
        digest(encoding: 'buffer'): Buffer;
        digest(encoding: string): any;
        digest(): Buffer;
    }
    export interface Hmac extends NodeJS.ReadWriteStream {
        update(data: any, input_encoding?: string): Hmac;
        digest(encoding: 'buffer'): Buffer;
        digest(encoding: string): any;
        digest(): Buffer;
    }
    export function createCipher(algorithm: string, password: any): Cipher;
    export function createCipheriv(algorithm: string, key: any, iv: any): Cipher;
    export interface Cipher {
        update(data: Buffer): Buffer;
        update(data: string, input_encoding?: string, output_encoding?: string): string;
        final(): Buffer;
        final(output_encoding: string): string;
        setAutoPadding(auto_padding: boolean): void;
        getAuthTag(): Buffer;
    }
    export function createDecipher(algorithm: string, password: any): Decipher;
    export function createDecipheriv(algorithm: string, key: any, iv: any): Decipher;
    export interface Decipher {
        update(data: Buffer): Buffer;
        update(data: string|Buffer, input_encoding?: string, output_encoding?: string): string;
        update(data: string|Buffer, input_encoding?: string, output_encoding?: string): Buffer;
        final(): Buffer;
        final(output_encoding: string): string;
        setAutoPadding(auto_padding: boolean): void;
        setAuthTag(tag: Buffer): void;
    }
    export function createSign(algorithm: string): Signer;
    export interface Signer extends NodeJS.WritableStream {
        update(data: any): void;
        sign(private_key: string, output_format: string): string;
    }
    export function createVerify(algorith: string): Verify;
    export interface Verify extends NodeJS.WritableStream {
        update(data: any): void;
        verify(object: string, signature: string, signature_format?: string): boolean;
    }
    export function createDiffieHellman(prime_length: number): DiffieHellman;
    export function createDiffieHellman(prime: number, encoding?: string): DiffieHellman;
    export interface DiffieHellman {
        generateKeys(encoding?: string): string;
        computeSecret(other_public_key: string, input_encoding?: string, output_encoding?: string): string;
        getPrime(encoding?: string): string;
        getGenerator(encoding: string): string;
        getPublicKey(encoding?: string): string;
        getPrivateKey(encoding?: string): string;
        setPublicKey(public_key: string, encoding?: string): void;
        setPrivateKey(public_key: string, encoding?: string): void;
    }
    export function getDiffieHellman(group_name: string): DiffieHellman;
    export function pbkdf2(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number, callback: (err: Error, derivedKey: Buffer) => any): void;
    export function pbkdf2(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number, digest: string, callback: (err: Error, derivedKey: Buffer) => any): void;
    export function pbkdf2Sync(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number) : Buffer;
    export function pbkdf2Sync(password: string|Buffer, salt: string|Buffer, iterations: number, keylen: number, digest: string) : Buffer;
    export function randomBytes(size: number): Buffer;
    export function randomBytes(size: number, callback: (err: Error, buf: Buffer) =>void ): void;
    export function pseudoRandomBytes(size: number): Buffer;
    export function pseudoRandomBytes(size: number, callback: (err: Error, buf: Buffer) =>void ): void;
    export interface RsaPublicKey {
        key: string;
        padding?: any;
    }
    export interface RsaPrivateKey {
        key: string;
        passphrase?: string,
        padding?: any;
    }
    export function publicEncrypt(public_key: string|RsaPublicKey, buffer: Buffer): Buffer
    export function privateDecrypt(private_key: string|RsaPrivateKey, buffer: Buffer): Buffer
}

declare module "stream" {
    import * as events from "events";

    export class Stream extends events.EventEmitter {
        pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
    }

    export interface ReadableOptions {
        highWaterMark?: number;
        encoding?: string;
        objectMode?: boolean;
    }

    export class Readable extends events.EventEmitter implements NodeJS.ReadableStream {
        readable: boolean;
        constructor(opts?: ReadableOptions);
        _read(size: number): void;
        read(size?: number): any;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
        unpipe<T extends NodeJS.WritableStream>(destination?: T): void;
        unshift(chunk: any): void;
        wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream;
        push(chunk: any, encoding?: string): boolean;
    }

    export interface WritableOptions {
        highWaterMark?: number;
        decodeStrings?: boolean;
        objectMode?: boolean;
    }

    export class Writable extends events.EventEmitter implements NodeJS.WritableStream {
        writable: boolean;
        constructor(opts?: WritableOptions);
        _write(chunk: any, encoding: string, callback: Function): void;
        write(chunk: any, cb?: Function): boolean;
        write(chunk: any, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(chunk: any, cb?: Function): void;
        end(chunk: any, encoding?: string, cb?: Function): void;
    }

    export interface DuplexOptions extends ReadableOptions, WritableOptions {
        allowHalfOpen?: boolean;
    }

    // Note: Duplex extends both Readable and Writable.
    export class Duplex extends Readable implements NodeJS.ReadWriteStream {
        writable: boolean;
        constructor(opts?: DuplexOptions);
        _write(chunk: any, encoding: string, callback: Function): void;
        write(chunk: any, cb?: Function): boolean;
        write(chunk: any, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(chunk: any, cb?: Function): void;
        end(chunk: any, encoding?: string, cb?: Function): void;
    }

    export interface TransformOptions extends ReadableOptions, WritableOptions {}

    // Note: Transform lacks the _read and _write methods of Readable/Writable.
    export class Transform extends events.EventEmitter implements NodeJS.ReadWriteStream {
        readable: boolean;
        writable: boolean;
        constructor(opts?: TransformOptions);
        _transform(chunk: any, encoding: string, callback: Function): void;
        _flush(callback: Function): void;
        read(size?: number): any;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
        unpipe<T extends NodeJS.WritableStream>(destination?: T): void;
        unshift(chunk: any): void;
        wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream;
        push(chunk: any, encoding?: string): boolean;
        write(chunk: any, cb?: Function): boolean;
        write(chunk: any, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(chunk: any, cb?: Function): void;
        end(chunk: any, encoding?: string, cb?: Function): void;
    }

    export class PassThrough extends Transform {}
}

declare module "util" {
    export interface InspectOptions {
        showHidden?: boolean;
        depth?: number;
        colors?: boolean;
        customInspect?: boolean;
    }

    export function format(format: any, ...param: any[]): string;
    export function debug(string: string): void;
    export function error(...param: any[]): void;
    export function puts(...param: any[]): void;
    export function print(...param: any[]): void;
    export function log(string: string): void;
    export function inspect(object: any, showHidden?: boolean, depth?: number, color?: boolean): string;
    export function inspect(object: any, options: InspectOptions): string;
    export function isArray(object: any): boolean;
    export function isRegExp(object: any): boolean;
    export function isDate(object: any): boolean;
    export function isError(object: any): boolean;
    export function inherits(constructor: any, superConstructor: any): void;
    export function debuglog(key:string): (msg:string,...param: any[])=>void;
}

declare module "assert" {
    function internal (value: any, message?: string): void;
    module internal {
        export class AssertionError implements Error {
            name: string;
            message: string;
            actual: any;
            expected: any;
            operator: string;
            generatedMessage: boolean;

            constructor(options?: {message?: string; actual?: any; expected?: any;
                                  operator?: string; stackStartFunction?: Function});
        }

        export function fail(actual?: any, expected?: any, message?: string, operator?: string): void;
        export function ok(value: any, message?: string): void;
        export function equal(actual: any, expected: any, message?: string): void;
        export function notEqual(actual: any, expected: any, message?: string): void;
        export function deepEqual(actual: any, expected: any, message?: string): void;
        export function notDeepEqual(acutal: any, expected: any, message?: string): void;
        export function strictEqual(actual: any, expected: any, message?: string): void;
        export function notStrictEqual(actual: any, expected: any, message?: string): void;
        export function deepStrictEqual(actual: any, expected: any, message?: string): void;
        export function notDeepStrictEqual(actual: any, expected: any, message?: string): void;
        export var throws: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        };

        export var doesNotThrow: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        };

        export function ifError(value: any): void;
    }

    export = internal;
}

declare module "tty" {
    import * as net from "net";

    export function isatty(fd: number): boolean;
    export interface ReadStream extends net.Socket {
        isRaw: boolean;
        setRawMode(mode: boolean): void;
        isTTY: boolean;
    }
    export interface WriteStream extends net.Socket {
        columns: number;
        rows: number;
        isTTY: boolean;
    }
}

declare module "domain" {
    import * as events from "events";

    export class Domain extends events.EventEmitter implements NodeJS.Domain {
        run(fn: Function): void;
        add(emitter: events.EventEmitter): void;
        remove(emitter: events.EventEmitter): void;
        bind(cb: (err: Error, data: any) => any): any;
        intercept(cb: (data: any) => any): any;
        dispose(): void;
    }

    export function create(): Domain;
}

declare module "constants" {
    export var E2BIG: number;
    export var EACCES: number;
    export var EADDRINUSE: number;
    export var EADDRNOTAVAIL: number;
    export var EAFNOSUPPORT: number;
    export var EAGAIN: number;
    export var EALREADY: number;
    export var EBADF: number;
    export var EBADMSG: number;
    export var EBUSY: number;
    export var ECANCELED: number;
    export var ECHILD: number;
    export var ECONNABORTED: number;
    export var ECONNREFUSED: number;
    export var ECONNRESET: number;
    export var EDEADLK: number;
    export var EDESTADDRREQ: number;
    export var EDOM: number;
    export var EEXIST: number;
    export var EFAULT: number;
    export var EFBIG: number;
    export var EHOSTUNREACH: number;
    export var EIDRM: number;
    export var EILSEQ: number;
    export var EINPROGRESS: number;
    export var EINTR: number;
    export var EINVAL: number;
    export var EIO: number;
    export var EISCONN: number;
    export var EISDIR: number;
    export var ELOOP: number;
    export var EMFILE: number;
    export var EMLINK: number;
    export var EMSGSIZE: number;
    export var ENAMETOOLONG: number;
    export var ENETDOWN: number;
    export var ENETRESET: number;
    export var ENETUNREACH: number;
    export var ENFILE: number;
    export var ENOBUFS: number;
    export var ENODATA: number;
    export var ENODEV: number;
    export var ENOENT: number;
    export var ENOEXEC: number;
    export var ENOLCK: number;
    export var ENOLINK: number;
    export var ENOMEM: number;
    export var ENOMSG: number;
    export var ENOPROTOOPT: number;
    export var ENOSPC: number;
    export var ENOSR: number;
    export var ENOSTR: number;
    export var ENOSYS: number;
    export var ENOTCONN: number;
    export var ENOTDIR: number;
    export var ENOTEMPTY: number;
    export var ENOTSOCK: number;
    export var ENOTSUP: number;
    export var ENOTTY: number;
    export var ENXIO: number;
    export var EOPNOTSUPP: number;
    export var EOVERFLOW: number;
    export var EPERM: number;
    export var EPIPE: number;
    export var EPROTO: number;
    export var EPROTONOSUPPORT: number;
    export var EPROTOTYPE: number;
    export var ERANGE: number;
    export var EROFS: number;
    export var ESPIPE: number;
    export var ESRCH: number;
    export var ETIME: number;
    export var ETIMEDOUT: number;
    export var ETXTBSY: number;
    export var EWOULDBLOCK: number;
    export var EXDEV: number;
    export var WSAEINTR: number;
    export var WSAEBADF: number;
    export var WSAEACCES: number;
    export var WSAEFAULT: number;
    export var WSAEINVAL: number;
    export var WSAEMFILE: number;
    export var WSAEWOULDBLOCK: number;
    export var WSAEINPROGRESS: number;
    export var WSAEALREADY: number;
    export var WSAENOTSOCK: number;
    export var WSAEDESTADDRREQ: number;
    export var WSAEMSGSIZE: number;
    export var WSAEPROTOTYPE: number;
    export var WSAENOPROTOOPT: number;
    export var WSAEPROTONOSUPPORT: number;
    export var WSAESOCKTNOSUPPORT: number;
    export var WSAEOPNOTSUPP: number;
    export var WSAEPFNOSUPPORT: number;
    export var WSAEAFNOSUPPORT: number;
    export var WSAEADDRINUSE: number;
    export var WSAEADDRNOTAVAIL: number;
    export var WSAENETDOWN: number;
    export var WSAENETUNREACH: number;
    export var WSAENETRESET: number;
    export var WSAECONNABORTED: number;
    export var WSAECONNRESET: number;
    export var WSAENOBUFS: number;
    export var WSAEISCONN: number;
    export var WSAENOTCONN: number;
    export var WSAESHUTDOWN: number;
    export var WSAETOOMANYREFS: number;
    export var WSAETIMEDOUT: number;
    export var WSAECONNREFUSED: number;
    export var WSAELOOP: number;
    export var WSAENAMETOOLONG: number;
    export var WSAEHOSTDOWN: number;
    export var WSAEHOSTUNREACH: number;
    export var WSAENOTEMPTY: number;
    export var WSAEPROCLIM: number;
    export var WSAEUSERS: number;
    export var WSAEDQUOT: number;
    export var WSAESTALE: number;
    export var WSAEREMOTE: number;
    export var WSASYSNOTREADY: number;
    export var WSAVERNOTSUPPORTED: number;
    export var WSANOTINITIALISED: number;
    export var WSAEDISCON: number;
    export var WSAENOMORE: number;
    export var WSAECANCELLED: number;
    export var WSAEINVALIDPROCTABLE: number;
    export var WSAEINVALIDPROVIDER: number;
    export var WSAEPROVIDERFAILEDINIT: number;
    export var WSASYSCALLFAILURE: number;
    export var WSASERVICE_NOT_FOUND: number;
    export var WSATYPE_NOT_FOUND: number;
    export var WSA_E_NO_MORE: number;
    export var WSA_E_CANCELLED: number;
    export var WSAEREFUSED: number;
    export var SIGHUP: number;
    export var SIGINT: number;
    export var SIGILL: number;
    export var SIGABRT: number;
    export var SIGFPE: number;
    export var SIGKILL: number;
    export var SIGSEGV: number;
    export var SIGTERM: number;
    export var SIGBREAK: number;
    export var SIGWINCH: number;
    export var SSL_OP_ALL: number;
    export var SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: number;
    export var SSL_OP_CIPHER_SERVER_PREFERENCE: number;
    export var SSL_OP_CISCO_ANYCONNECT: number;
    export var SSL_OP_COOKIE_EXCHANGE: number;
    export var SSL_OP_CRYPTOPRO_TLSEXT_BUG: number;
    export var SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS: number;
    export var SSL_OP_EPHEMERAL_RSA: number;
    export var SSL_OP_LEGACY_SERVER_CONNECT: number;
    export var SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER: number;
    export var SSL_OP_MICROSOFT_SESS_ID_BUG: number;
    export var SSL_OP_MSIE_SSLV2_RSA_PADDING: number;
    export var SSL_OP_NETSCAPE_CA_DN_BUG: number;
    export var SSL_OP_NETSCAPE_CHALLENGE_BUG: number;
    export var SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG: number;
    export var SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG: number;
    export var SSL_OP_NO_COMPRESSION: number;
    export var SSL_OP_NO_QUERY_MTU: number;
    export var SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION: number;
    export var SSL_OP_NO_SSLv2: number;
    export var SSL_OP_NO_SSLv3: number;
    export var SSL_OP_NO_TICKET: number;
    export var SSL_OP_NO_TLSv1: number;
    export var SSL_OP_NO_TLSv1_1: number;
    export var SSL_OP_NO_TLSv1_2: number;
    export var SSL_OP_PKCS1_CHECK_1: number;
    export var SSL_OP_PKCS1_CHECK_2: number;
    export var SSL_OP_SINGLE_DH_USE: number;
    export var SSL_OP_SINGLE_ECDH_USE: number;
    export var SSL_OP_SSLEAY_080_CLIENT_DH_BUG: number;
    export var SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG: number;
    export var SSL_OP_TLS_BLOCK_PADDING_BUG: number;
    export var SSL_OP_TLS_D5_BUG: number;
    export var SSL_OP_TLS_ROLLBACK_BUG: number;
    export var ENGINE_METHOD_DSA: number;
    export var ENGINE_METHOD_DH: number;
    export var ENGINE_METHOD_RAND: number;
    export var ENGINE_METHOD_ECDH: number;
    export var ENGINE_METHOD_ECDSA: number;
    export var ENGINE_METHOD_CIPHERS: number;
    export var ENGINE_METHOD_DIGESTS: number;
    export var ENGINE_METHOD_STORE: number;
    export var ENGINE_METHOD_PKEY_METHS: number;
    export var ENGINE_METHOD_PKEY_ASN1_METHS: number;
    export var ENGINE_METHOD_ALL: number;
    export var ENGINE_METHOD_NONE: number;
    export var DH_CHECK_P_NOT_SAFE_PRIME: number;
    export var DH_CHECK_P_NOT_PRIME: number;
    export var DH_UNABLE_TO_CHECK_GENERATOR: number;
    export var DH_NOT_SUITABLE_GENERATOR: number;
    export var NPN_ENABLED: number;
    export var RSA_PKCS1_PADDING: number;
    export var RSA_SSLV23_PADDING: number;
    export var RSA_NO_PADDING: number;
    export var RSA_PKCS1_OAEP_PADDING: number;
    export var RSA_X931_PADDING: number;
    export var RSA_PKCS1_PSS_PADDING: number;
    export var POINT_CONVERSION_COMPRESSED: number;
    export var POINT_CONVERSION_UNCOMPRESSED: number;
    export var POINT_CONVERSION_HYBRID: number;
    export var O_RDONLY: number;
    export var O_WRONLY: number;
    export var O_RDWR: number;
    export var S_IFMT: number;
    export var S_IFREG: number;
    export var S_IFDIR: number;
    export var S_IFCHR: number;
    export var S_IFLNK: number;
    export var O_CREAT: number;
    export var O_EXCL: number;
    export var O_TRUNC: number;
    export var O_APPEND: number;
    export var F_OK: number;
    export var R_OK: number;
    export var W_OK: number;
    export var X_OK: number;
    export var UV_UDP_REUSEADDR: number;
}// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/14cc56099a4c90926839e406a87d36596d093708/request-promise/request-promise.d.ts
// Type definitions for request-promise v0.4.2
// Project: https://www.npmjs.com/package/request-promise
// Definitions by: Christopher Glantschnig <https://github.com/cglantschnig/>, Joe Skeen <http://github.com/joeskeen>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Change [0]: 2015/08/20 - Aya Morisawa <https://github.com/AyaMorisawa>


declare module 'request-promise' {
    import request = require('request');
    import http = require('http');
        
    interface RequestPromise extends request.Request {
        then<TResult>(onfulfilled?: (value: any) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<TResult>;
        then<TResult>(onfulfilled?: (value: any) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => void): Promise<TResult>;
        catch(onrejected?: (reason: any) => any | PromiseLike<any>): Promise<any>;
        catch(onrejected?: (reason: any) => void): Promise<any>;
        finally<TResult>(handler: () => PromiseLike<TResult>): Promise<any>;
        finally<TResult>(handler: () => TResult): Promise<any>;
        promise(): Promise<any>;
    }
    
    interface RequestPromiseOptions extends request.CoreOptions {
        simple?: boolean;
        transform?: (body: any, response: http.IncomingMessage) => any;
        resolveWithFullResponse?: boolean;
    }
    
    var requestPromise: request.RequestAPI<RequestPromise, RequestPromiseOptions, request.RequiredUriUrl>;
	export = requestPromise;
}// Compiled using typings@0.6.8
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/abc2bcfb8524b1e027e6298d3348012b5b06eda5/request/request.d.ts
// Type definitions for request
// Project: https://github.com/mikeal/request
// Definitions by: Carlos Ballesteros Velasco <https://github.com/soywiz>, bonnici <https://github.com/bonnici>, Bart van der Schoor <https://github.com/Bartvds>, Joe Skeen <http://github.com/joeskeen>, Christopher Currens <https://github.com/ccurrens>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

// Imported from: https://github.com/soywiz/typescript-node-definitions/d.ts


declare module 'request' {
	import stream = require('stream');
	import http = require('http');
	import FormData = require('form-data');
	import url = require('url');
	import fs = require('fs');

	namespace request {
		export interface RequestAPI<TRequest extends Request,
			TOptions extends CoreOptions,
			TUriUrlOptions> {

			defaults(options: TOptions): RequestAPI<TRequest, TOptions, RequiredUriUrl>;
			defaults(options: RequiredUriUrl & TOptions): DefaultUriUrlRequestApi<TRequest, TOptions, OptionalUriUrl>;

			(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
			(uri: string, callback?: RequestCallback): TRequest;
			(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

			get(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
			get(uri: string, callback?: RequestCallback): TRequest;
			get(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

			post(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
			post(uri: string, callback?: RequestCallback): TRequest;
			post(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

			put(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
			put(uri: string, callback?: RequestCallback): TRequest;
			put(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

			head(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
			head(uri: string, callback?: RequestCallback): TRequest;
			head(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

			patch(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
			patch(uri: string, callback?: RequestCallback): TRequest;
			patch(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

			del(uri: string, options?: TOptions, callback?: RequestCallback): TRequest;
			del(uri: string, callback?: RequestCallback): TRequest;
			del(options: TUriUrlOptions & TOptions, callback?: RequestCallback): TRequest;

			forever(agentOptions: any, optionsArg: any): TRequest;
			jar(): CookieJar;
			cookie(str: string): Cookie;

			initParams: any;
			debug: boolean;
		}

		interface DefaultUriUrlRequestApi<TRequest extends Request,
			TOptions extends CoreOptions,
			TUriUrlOptions>	extends RequestAPI<TRequest, TOptions, TUriUrlOptions> {

			defaults(options: TOptions): DefaultUriUrlRequestApi<TRequest, TOptions, OptionalUriUrl>;
			(): TRequest;
			get(): TRequest;
			post(): TRequest;
			put(): TRequest;
			head(): TRequest;
			patch(): TRequest;
			del(): TRequest;
		}

		interface CoreOptions {
			baseUrl?: string;
			callback?: (error: any, response: http.IncomingMessage, body: any) => void;
			jar?: any; // CookieJar
			formData?: any; // Object
			form?: any; // Object or string
			auth?: AuthOptions;
			oauth?: OAuthOptions;
			aws?: AWSOptions;
			hawk?: HawkOptions;
			qs?: any;
			json?: any;
			multipart?: RequestPart[] | Multipart;
			agentOptions?: any;
			agentClass?: any;
			forever?: any;
			host?: string;
			port?: number;
			method?: string;
			headers?: Headers;
			body?: any;
			followRedirect?: boolean | ((response: http.IncomingMessage) => boolean);
			followAllRedirects?: boolean;
			maxRedirects?: number;
			encoding?: string;
			pool?: any;
			timeout?: number;
			proxy?: any;
			strictSSL?: boolean;
			gzip?: boolean;
			preambleCRLF?: boolean;
			postambleCRLF?: boolean;
			key?: Buffer;
			cert?: Buffer;
			passphrase?: string;
			ca?: Buffer;
			har?: HttpArchiveRequest;
			useQuerystring?: boolean;
		}

		interface UriOptions {
			uri: string;
		}
		interface UrlOptions {
			url: string;
		}
		export type RequiredUriUrl = UriOptions | UrlOptions;

		interface OptionalUriUrl {
			uri?: string;
			url?: string;
		}

        export type OptionsWithUri = UriOptions & CoreOptions;
        export type OptionsWithUrl = UrlOptions & CoreOptions;
        export type Options = OptionsWithUri | OptionsWithUrl;

		export interface RequestCallback {
			(error: any, response: http.IncomingMessage, body: any): void;
		}

		export interface HttpArchiveRequest {
			url?: string;
			method?: string;
			headers?: NameValuePair[];
			postData?: {
				mimeType?: string;
				params?: NameValuePair[];
			}
		}

		export interface NameValuePair {
			name: string;
			value: string;
		}

		export interface Multipart {
			chunked?: boolean;
			data?: {
				'content-type'?: string,
				body: string
			}[];
		}

		export interface RequestPart {
			headers?: Headers;
			body: any;
		}

		export interface Request extends stream.Stream {
			readable: boolean;
			writable: boolean;

			getAgent(): http.Agent;
			//start(): void;
			//abort(): void;
			pipeDest(dest: any): void;
			setHeader(name: string, value: string, clobber?: boolean): Request;
			setHeaders(headers: Headers): Request;
			qs(q: Object, clobber?: boolean): Request;
			form(): FormData.FormData;
			form(form: any): Request;
			multipart(multipart: RequestPart[]): Request;
			json(val: any): Request;
			aws(opts: AWSOptions, now?: boolean): Request;
			auth(username: string, password: string, sendInmediately?: boolean, bearer?: string): Request;
			oauth(oauth: OAuthOptions): Request;
			jar(jar: CookieJar): Request;

			on(event: string, listener: Function): this;
			on(event: 'request', listener: (req: http.ClientRequest) => void): this;
			on(event: 'response', listener: (resp: http.IncomingMessage) => void): this;
			on(event: 'data', listener: (data: Buffer | string) => void): this;
			on(event: 'error', listener: (e: Error) => void): this;
			on(event: 'complete', listener: (resp: http.IncomingMessage, body?: string | Buffer) => void): this;

			write(buffer: Buffer, cb?: Function): boolean;
			write(str: string, cb?: Function): boolean;
			write(str: string, encoding: string, cb?: Function): boolean;
			write(str: string, encoding?: string, fd?: string): boolean;
			end(): void;
			end(chunk: Buffer, cb?: Function): void;
			end(chunk: string, cb?: Function): void;
			end(chunk: string, encoding: string, cb?: Function): void;
			pause(): void;
			resume(): void;
			abort(): void;
			destroy(): void;
			toJSON(): Object;
		}

		export interface Headers {
			[key: string]: any;
		}

		export interface AuthOptions {
			user?: string;
			username?: string;
			pass?: string;
			password?: string;
			sendImmediately?: boolean;
			bearer?: string;
		}

		export interface OAuthOptions {
			callback?: string;
			consumer_key?: string;
			consumer_secret?: string;
			token?: string;
			token_secret?: string;
			verifier?: string;
		}

		export interface HawkOptions {
			credentials: any;
		}

		export interface AWSOptions {
			secret: string;
			bucket?: string;
		}

		export interface CookieJar {
			setCookie(cookie: Cookie, uri: string | url.Url, options?: any): void
			getCookieString(uri: string | url.Url): string
			getCookies(uri: string | url.Url): Cookie[]
		}

		export interface CookieValue {
			name: string;
			value: any;
			httpOnly: boolean;
		}

		export interface Cookie extends Array<CookieValue> {
			constructor(name: string, req: Request): void;
			str: string;
			expires: Date;
			path: string;
			toString(): string;
		}
	}
	var request: request.RequestAPI<request.Request, request.CoreOptions, request.RequiredUriUrl>;
	export = request;
}declare module 'tsmvc' {
	import main = require('tsmvc/lib/index');
	export = main;
}
