import * as BPromise from 'bluebird';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';

declare module 'tsgeneric-dao-api' {

    export interface GenericDAO<T> {
        create(model: T): BPromise<T>;
        get(id: number | string): BPromise<T | any>;
        getAll(): BPromise<[T]>;
        update(model: any): BPromise<T>;
        delete(id: number | string): BPromise<any>;
    }


    export interface IGenericAPI {
        route: String;
    }

    export interface GenericAPI {
        DAO: GenericDAO<any>;
        route: String;
    }

    export abstract class GenericDAOImplMongoose<T, Q extends Document> implements GenericDAO<T> {
        static _model;
        public model;
        static created;
        constructor(_modelName: string, _modelSchema);
        create(obj: T): BPromise<T>;
        get(id: string): BPromise<Q>;
        getWithParams(find: any): BPromise<Q>;
        getAll(): BPromise<[T]>;
        update(obj: Q, id?: string): BPromise<T>;
        delete(id): BPromise<any>;
    }

    export abstract class GenericAPIImplExpress implements GenericAPI {
        DAO: GenericDAO<any>;
        route: String;
        constructor(route: String, DAO: GenericDAO<any>);
        init(router: express.Router);
        protected baseRoute(router: express.Router);
        protected moreRoutes(router: express.Router);
        protected idRoute(router: express.Router);
        private onError(res: express.Response, error: any, status?: number);
        get(req: express.Request, res: express.Response);
        getAll(req: express.Request, res: express.Response);
        create(req: express.Request, res: express.Response);
        update(req: express.Request, res: express.Response);
        delete(req: express.Request, res: express.Response);
    }

}
