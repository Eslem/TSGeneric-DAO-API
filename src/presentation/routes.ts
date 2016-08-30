import * as express from 'express';
import { NoteApi } from './impl';

export class Routes {
    private
    static init(app: express.Application, router: express.Router) {
        let noteApi = new NoteApi();
        //  router.route('*').get(StaticDispatcher.sendIndex);
        noteApi.init(router);
        router.route('/').get(
            (req, res) => {
                res.send('Nain');
            }
        );
        app.use('/', router);
    }
}
