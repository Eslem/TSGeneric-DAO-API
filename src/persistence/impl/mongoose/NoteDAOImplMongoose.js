var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenericDAOImplMongoose_1 = require('./GenericDAOImplMongoose');
var mongoose = require('mongoose');
var NoteDAOImplMongoose = (function (_super) {
    __extends(NoteDAOImplMongoose, _super);
    function NoteDAOImplMongoose() {
        _super.call(this, "Note", new mongoose.Schema({
            title: String,
            message: String
        }));
    }
    return NoteDAOImplMongoose;
})(GenericDAOImplMongoose_1.GenericDAOImplMongoose);
exports.NoteDAOImplMongoose = NoteDAOImplMongoose;
//# sourceMappingURL=NoteDAOImplMongoose.js.map