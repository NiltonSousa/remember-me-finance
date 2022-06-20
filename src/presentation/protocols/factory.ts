export interface IFactory<T> {
    make(): T;
}