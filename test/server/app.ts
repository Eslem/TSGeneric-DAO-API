var PORT = process.env.PORT || 3334;

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as os from 'os';
import * as http from 'http';
import { setUpApi }  from './../common/NoteApi';

export let app = express();
app.use(bodyParser.json());
setUpApi(app, express.Router());

http.createServer(app)
    .listen(PORT, () => {
        console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
        console.log(`enviroment: ${process.env.NODE_ENV}`);
    });
