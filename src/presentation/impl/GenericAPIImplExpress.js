var GenericAPIImplExpress = (function () {
    function GenericAPIImplExpress(route, DAO) {
        this.route = route;
        this.DAO = DAO;
    }
    GenericAPIImplExpress.prototype.init = function (router) {
        console.log('Route ' + this.route + ' inited');
        this.baseRoute(router);
        this.idRoute(router);
        this.moreRoutes(router);
    };
    GenericAPIImplExpress.prototype.baseRoute = function (router) {
        var _this = this;
        router.route('/api/' + this.route)
            .get(function (req, res) { return _this.getAll(req, res); })
            .post(function (req, res) { return _this.create(req, res); });
    };
    GenericAPIImplExpress.prototype.moreRoutes = function (router) {
    };
    GenericAPIImplExpress.prototype.idRoute = function (router) {
        var _this = this;
        router
            .route('/api/' + this.route + '/:id')
            .get(function (req, res) { return _this.get(req, res); })
            .post(function (req, res) { return _this.update(req, res); })
            .delete(function (req, res) { return _this.delete(req, res); });
    };
    GenericAPIImplExpress.prototype.onError = function (res, error, status) {
        res.status(status || 400).json(error);
    };
    GenericAPIImplExpress.prototype.get = function (req, res) {
        var _this = this;
        this.DAO.get(req.params.id).then(function (obj) {
            if (!obj)
                return res.status(404).end();
            res.status(200).json(obj);
        }).catch(function (err) { return _this.onError(res, err); });
    };
    GenericAPIImplExpress.prototype.getAll = function (req, res) {
        var _this = this;
        this.DAO.getAll().then(function (objs) { return res.status(200).json(objs); }).catch(function (err) { return _this.onError(res, err); });
    };
    GenericAPIImplExpress.prototype.create = function (req, res) {
        var _this = this;
        var obj = req.body;
        this.DAO.create(obj).then(function (result) { return res.status(201).json(result); }).catch(function (err) { return _this.onError(res, err); });
    };
    GenericAPIImplExpress.prototype.update = function (req, res) {
        var _this = this;
        var obj = req.body;
        this.DAO.update(obj, req.params.id).then(function (updated) {
            if (!updated)
                return res.status(404).end();
            res.status(200).json(updated);
        }).catch(function (err) { return _this.onError(res, err); });
    };
    GenericAPIImplExpress.prototype.delete = function (req, res) {
        var _this = this;
        this.DAO.delete(req.params.id).then(function (obj) {
            if (!obj)
                return res.status(404).end();
            res.status(200).json(obj);
        }).catch(function (err) { return _this.onError(res, err); });
    };
    return GenericAPIImplExpress;
})();
exports.GenericAPIImplExpress = GenericAPIImplExpress;
//# sourceMappingURL=GenericAPIImplExpress.js.map