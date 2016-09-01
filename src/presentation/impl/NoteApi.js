var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GenericAPIImplExpress_1 = require('./GenericAPIImplExpress');
var persistence_1 = require('./../../persistence');
var NoteApi = (function (_super) {
    __extends(NoteApi, _super);
    function NoteApi() {
        _super.call(this, 'notes', new persistence_1.NoteDAOImplMongoose());
    }
    return NoteApi;
})(GenericAPIImplExpress_1.GenericAPIImplExpress);
exports.NoteApi = NoteApi;
//# sourceMappingURL=NoteApi.js.map