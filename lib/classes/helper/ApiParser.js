"use strict";
var List_1 = require("./List");
var ApiItemParser = (function () {
    function ApiItemParser() {
    }
    ApiItemParser.prototype.Parse = function (response) {
        return JSON.parse(response);
    };
    ApiItemParser.prototype.ParseList = function (response) {
        var items = new List_1.List();
        var resp = JSON.parse(response);
        resp.forEach(function (modelListItem) {
            var model = modelListItem;
            items.add(model);
        });
        return items;
    };
    return ApiItemParser;
}());
exports.ApiItemParser = ApiItemParser;
