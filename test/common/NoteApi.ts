import { GenericAPIImplExpress } from './../../src/presentation';
import { NoteDAOImplMongoose } from './NoteDB';

export class NoteApi extends GenericAPIImplExpress {
    constructor() {
        super('notes', new NoteDAOImplMongoose());
    }
}


export function setUpApi(app, router) {
    let noteApi = new NoteApi();
    noteApi.init(router);
    router.route('/').get(
        (req, res) => {
            res.json({title:'Nain'});
        }
    );
    app.use('/', router);
}
