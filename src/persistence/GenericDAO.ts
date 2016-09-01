import * as BPromise from 'bluebird';

export interface GenericDAO <T>{
  create(model:T):BPromise<T>;
  get(id:number|string): BPromise<T|any>;
  getAll():BPromise<[T]>;
  update(model:any):BPromise<T>;
  delete(id:number|string):BPromise<any>;
}
