import { GenericAPI } from'./../GenericAPI';
import * as express from 'express';
import { GenericDAO } from './../../persistence';


export abstract class GenericAPIImplExpress implements GenericAPI {

    constructor(protected route: String, public DAO: GenericDAO<any>) {
    }

    init(router: express.Router) {
        console.log('Route ' + this.route + ' inited');

        this.baseRoute(router);
        this.idRoute(router);
        this.moreRoutes(router);
    }

    protected baseRoute(router: express.Router) {
        router.route('/api/' + this.route)
            .get((req, res) => this.getAll(req, res))
            .post((req, res) => this.create(req, res))
    }

    protected moreRoutes(router: express.Router) {

    }

    protected idRoute(router: express.Router) {
        router
            .route('/api/' + this.route + '/:id')
            .get((req, res) => this.get(req, res))
            .post((req, res) => this.update(req, res))
            .delete((req, res) => this.delete(req, res));
    }

    private onError(res: express.Response, error: any, status?: number) {
        res.status(status || 400).json(error);
    }


    get(req: express.Request, res: express.Response) {
        this.DAO.get(req.params.id).then(
            obj => {
                if (!obj)
                    return res.status(404).end();
                res.status(200).json(obj);
            }
        ).catch(err => this.onError(res, err));
    }

    getAll(req: express.Request, res: express.Response) {
        this.DAO.getAll().then(
            objs => res.status(200).json(objs)
        ).catch(err => this.onError(res, err));
    }

    create(req: express.Request, res: express.Response) {
        let obj = req.body;
        this.DAO.create(obj).then(
            result => res.status(201).json(result)
        ).catch(err => this.onError(res, err));
    }

    update(req: express.Request, res: express.Response) {
        let obj = req.body;
        this.DAO.update(obj, req.params.id).then(
            updated => {
                if (!updated)
                    return res.status(404).end();
                res.status(200).json(updated);
            }
        ).catch(err => this.onError(res, err));
    }

    delete(req: express.Request, res: express.Response) {
        this.DAO.delete(req.params.id).then(
            obj => {
                if (!obj)
                    return res.status(404).end();
                res.status(200).json(obj);
            }
        ).catch(err => this.onError(res, err));
    }
}
