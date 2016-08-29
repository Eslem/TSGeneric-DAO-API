import * as Promise from 'bluebird';

export interface GenericDAO <T>{
  create(model:T):Promise<T>;
  get(id:number|string): Promise<T|any>;
  getAll():Promise<[T]>;
  update(model:any):Promise<T>;
  delete(id:number|string):Promise<any>;
}
