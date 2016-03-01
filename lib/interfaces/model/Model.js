"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Serializable_1 = require("./Serializable");
var Model = (function (_super) {
    __extends(Model, _super);
    function Model() {
        _super.apply(this, arguments);
    }
    //Dynamically get index based on which property was marked with
    //@indexKey annotation.
    Model.prototype.getIndex = function () {
        if (this['indexKey'] === undefined) {
            return null;
        }
        return this[this['indexKey']];
    };
    return Model;
}(Serializable_1.Serializable));
exports.Model = Model;
function indexKey(target, name) {
    target.indexKey = name;
}
exports.indexKey = indexKey;
