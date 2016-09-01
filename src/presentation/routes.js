"use strict";
var Routes = (function () {
    function Routes() {
    }
    Routes.init = function (app, router) {
        router.route('/').get(function (req, res) {
            res.send('Nain');
        });
        app.use('/', router);
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map