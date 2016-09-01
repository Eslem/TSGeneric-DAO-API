'use strict';
var PORT = process.env.PORT || 3333;
var express = require('express');
var os = require('os');
var http = require('http');
var presentation_1 = require('./presentation');
var persistence_1 = require('./persistence');
exports.app = express();
presentation_1.Routes.init(exports.app, express.Router());
persistence_1.DBConfig.init();
http.createServer(exports.app)
    .listen(PORT, function () {
    console.log("up and running @: " + os.hostname() + " on port: " + PORT);
    console.log("enviroment: " + process.env.NODE_ENV);
});
//# sourceMappingURL=server.js.map