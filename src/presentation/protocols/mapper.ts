export interface IMapper<T, U> {
  marshall(model: T): U;
  unmarshall(model: U): T;
}
