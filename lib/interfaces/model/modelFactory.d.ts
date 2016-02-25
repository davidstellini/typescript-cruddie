import { Model } from "./Model";
export interface ModelFactory<T extends Model> {
    create(): T;
}
