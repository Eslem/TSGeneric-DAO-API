import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import {Model, Document, Schema} from 'mongoose';
import {GenericDAO} from './../../GenericDAO';

export abstract class GenericDAOImplMongoose<T, Q extends Document> implements GenericDAO<T> {
    public _model;

    constructor(protected _modelName: string, protected _modelSchema) {
        this._model = mongoose.model<Q>(_modelName, _modelSchema);
    }

    create(obj: T): Promise<T> {
        return new Promise<T>(
            (resolve: Function, reject: Function) => {
                if (!_.isObject(obj))
                    return reject(new TypeError('DAO.create value passed is not a valid object.'));
                let modeled = new this._model(obj);
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

                this._model.findById(id).exec((err, item: T) =>
                    err ? reject(err) : resolve(item)
                );
            }
        )
    },

    getWithParams(find:any): Promise<Q> {
        return new Promise<Q>(
            (resolve: Function, reject: Function) => {
                if (!_.isObject(find))
                    return reject(new TypeError('DAO.getParams params passed is not an object.'));

                this._model.find(find).exec((err, item: T) =>
                    err ? reject(err) : resolve(item)
                );
            }
        )
    }


    getAll(): Promise<[T]> {
        return new Promise<[T]>(
            (resolve: Function, reject: Function) => {
                this._model.find({}).exec(
                    (err, items) => err ? reject(err) : resolve(items)
                )
            }
        )
    }

    update(obj: Q): Promise<T> {
        return new Promise<T>(
            (resolve: Function, reject: Function) => {
              if (!_.isObject(obj))
                  return reject(new TypeError('DAO.update value passed is not object.'));
              if (!obj._id)
                  return reject(new TypeError('DAO.update object passed doesn\'t have _id.'));
                this._model.findById(obj._id).exec(
                    (err, found) => {
                        if (err) reject(err);
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
                this._model.findByIdAndRemove(id).exec(
                    (err, deleted) => err ? reject(err) : resolve()
                )
            }
        )
    }


}
