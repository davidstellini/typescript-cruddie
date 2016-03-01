"use strict";
var List_1 = require("./List");
var ApiParser = (function () {
    function ApiParser() {
    }
    ApiParser.Parse = function (response) {
        return JSON.parse(response);
    };
    ApiParser.ParseList = function (response) {
        var items = new List_1.List();
        var resp = JSON.parse(response);
        resp.forEach(function (modelListItem) {
            var model = modelListItem;
            items.add(model);
        });
        return items;
    };
    return ApiParser;
}());
exports.ApiParser = ApiParser;
