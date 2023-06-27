type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type ServerProp<T extends (...args: any) => any> = UnwrapPromise<ReturnType<T>>['props'];
