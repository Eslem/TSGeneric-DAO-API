'use strict';

var PORT = process.env.PORT || 3333;

import * as express from 'express';
import * as os from 'os';
import * as http from 'http';
import {Routes} from './presentation';
import {DBConfig} from './persistence';
export let app = express();

Routes.init(app, express.Router());
DBConfig.init();
http.createServer(app)
    .listen(PORT, () => {
        console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
        console.log(`enviroment: ${process.env.NODE_ENV}`);
    });
