export declare class List<T> {
    private items;
    constructor();
    size(): number;
    add(value: T): void;
    get(index: number): T;
    first(): T;
    last(): T;
    getArray(): Array<T>;
}
