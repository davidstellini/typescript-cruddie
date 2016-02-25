"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ApiParser_1 = require("./ApiParser");
var DefaultApiParser = (function (_super) {
    __extends(DefaultApiParser, _super);
    function DefaultApiParser(factory) {
        _super.call(this);
        this.factory = factory;
    }
    return DefaultApiParser;
}(ApiParser_1.ApiItemParser));
exports.DefaultApiParser = DefaultApiParser;
