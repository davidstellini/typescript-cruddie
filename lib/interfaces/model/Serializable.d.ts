export declare abstract class Serializable {
    FromJson(obj: any): void;
    Stringify(): string;
    parse<T extends Serializable>(string: string): T;
}
