import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import {Model, Document, Schema} from 'mongoose';
import {GenericDAO} from './../../GenericDAO';

export abstract class GenericDAOImplMongoose<T, Q extends Document> implements GenericDAO<T> {
    static _model;
    public model;
    static created = false;

    constructor(protected _modelName: string, protected _modelSchema) {
      if(!this.constructor['created']){
        this.constructor['_model'] = mongoose.model<Q>(_modelName, _modelSchema);
        this.constructor['created'] = true;
      }

      this.model = this.constructor['_model'];
    }

    create(obj: T): Promise<T> {
        return new Promise<T>(
            (resolve: Function, reject: Function) => {
                if (!_.isObject(obj))
                    return reject(new TypeError('DAO.create value passed is not a valid object.'));
                let modeled = new this.model(obj);
                modeled.save(
                    (err, saved: T) =>
                        err ? reject(err) : resolve(saved));
            }
        )
    }

    get(id: string): Promise<Q> {
        return new Promise<Q>(
            (resolve: Function, reject: Function) => {
                if (!_.isString(id) && !_.isObject(id))
                    return reject(new TypeError('DAO.get id passed is not an string or object.'));

                this.model.findById(id).exec((err, item: T) =>
                    err ? reject(err) : resolve(item)
                );
            }
        );
    }

    getWithParams(find:any): Promise<Q> {
        return new Promise<Q>(
            (resolve: Function, reject: Function) => {
                if (!_.isObject(find))
                    return reject(new TypeError('DAO.getParams params passed is not an object.'));

                this.model.find(find).exec((err, item: T) =>
                    err ? reject(err) : resolve(item)
                );
            }
        )
    }


    getAll(): Promise<[T]> {
        return new Promise<[T]>(
            (resolve: Function, reject: Function) => {
                this.model.find({}).exec(
                    (err, items) => err ? reject(err) : resolve(items)
                )
            }
        )
    }

    update(obj: Q, id?:string): Promise<T> {
        return new Promise<T>(
            (resolve: Function, reject: Function) => {
              if (!_.isObject(obj))
                  return reject(new TypeError('DAO.update value passed is not object.'));
              if (!id && !obj._id)
                  return reject(new TypeError('DAO.update object passed doesn\'t have _id.'));
                this.model.findById(id || obj._id).exec(
                    (err, found) => {
                        if (err) reject(err);
                        if (!found) resolve(found);
                        let updated = _.merge(found, obj);
                        updated.save(
                            (err, updated) =>
                                err ? reject(err) : resolve(updated)
                        )
                    }
                )
            }
        );
    }


    delete(id): Promise<any> {
        return new Promise(
            (resolve: Function, reject: Function) => {
                if (!_.isString(id) && !_.isObject(id))
                    return reject(new TypeError('DAO.delete id passed is not an string or object.'));
                this.model.findByIdAndRemove(id).exec(
                    (err, deleted) => err ? reject(err) : resolve(deleted)
                )
            }
        )
    }


}
