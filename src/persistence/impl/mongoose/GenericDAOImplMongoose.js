var mongoose = require('mongoose');
var _ = require('lodash');
var BPromise = require('bluebird');
var GenericDAOImplMongoose = (function () {
    function GenericDAOImplMongoose(_modelName, _modelSchema) {
        this._modelName = _modelName;
        this._modelSchema = _modelSchema;
        if (!this.constructor['created']) {
            this.constructor['_model'] = mongoose.model(_modelName, _modelSchema);
            this.constructor['created'] = true;
        }
        this.model = this.constructor['_model'];
    }
    GenericDAOImplMongoose.prototype.create = function (obj) {
        var _this = this;
        return new BPromise(function (resolve, reject) {
            if (!_.isObject(obj))
                return reject(new TypeError('DAO.create value passed is not a valid object.'));
            var modeled = new _this.model(obj);
            modeled.save(function (err, saved) {
                return err ? reject(err) : resolve(saved);
            });
        });
    };
    GenericDAOImplMongoose.prototype.get = function (id) {
        var _this = this;
        return new BPromise(function (resolve, reject) {
            if (!_.isString(id) && !_.isObject(id))
                return reject(new TypeError('DAO.get id passed is not an string or object.'));
            return _this.model.findById(id).exec(function (err, item) {
                return err ? reject(err) : resolve(item);
            });
        });
    };
    GenericDAOImplMongoose.prototype.getWithParams = function (find) {
        var _this = this;
        return new BPromise(function (resolve, reject) {
            if (!_.isObject(find))
                return reject(new TypeError('DAO.getParams params passed is not an object.'));
            _this.model.find(find).exec(function (err, item) {
                return err ? reject(err) : resolve(item);
            });
        });
    };
    GenericDAOImplMongoose.prototype.getAll = function () {
        var _this = this;
        return new BPromise(function (resolve, reject) {
            _this.model.find({}).exec(function (err, items) { return err ? reject(err) : resolve(items); });
        });
    };
    GenericDAOImplMongoose.prototype.update = function (obj, id) {
        var _this = this;
        return new BPromise(function (resolve, reject) {
            if (!_.isObject(obj))
                return reject(new TypeError('DAO.update value passed is not object.'));
            if (!id && !obj._id)
                return reject(new TypeError('DAO.update object passed doesn\'t have _id.'));
            _this.model.findById(id || obj._id).exec(function (err, found) {
                if (err)
                    reject(err);
                if (!found)
                    resolve(found);
                var updated = _.merge(found, obj);
                updated.save(function (err, updated) {
                    return err ? reject(err) : resolve(updated);
                });
            });
        });
    };
    GenericDAOImplMongoose.prototype.delete = function (id) {
        var _this = this;
        return new BPromise(function (resolve, reject) {
            if (!_.isString(id) && !_.isObject(id))
                return reject(new TypeError('DAO.delete id passed is not an string or object.'));
            _this.model.findByIdAndRemove(id).exec(function (err, deleted) { return err ? reject(err) : resolve(deleted); });
        });
    };
    GenericDAOImplMongoose.created = false;
    return GenericDAOImplMongoose;
})();
exports.GenericDAOImplMongoose = GenericDAOImplMongoose;
//# sourceMappingURL=GenericDAOImplMongoose.js.map