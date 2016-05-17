"use strict";
var List_1 = require("./List");
var ApiParser = (function () {
    function ApiParser() {
    }
    ApiParser.Parse = function (objType, json) {
        var newObj = new objType();
        var relationships = objType["relationships"] || {};
        for (var prop in json) {
            if (json.hasOwnProperty(prop)) {
                if (newObj[prop] == null) {
                    if (relationships[prop] == null) {
                        newObj[prop] = json[prop];
                    }
                    else {
                        newObj[prop] = ApiParser.Parse(relationships[prop], json[prop]);
                    }
                }
                else {
                    console.warn("Property " + prop + " not set because it already existed on the object.");
                }
            }
        }
        return newObj;
    };
    ApiParser.ParseList = function (objType, jsonString) {
        var json = JSON.parse(jsonString);
        var items = new List_1.List();
        if (!Array.isArray(json)) {
            throw ("Invalid response: " + jsonString);
        }
        json.forEach(function (modelListItem) {
            var model = modelListItem;
            items.add(model);
        });
        return items;
    };
    ApiParser.ParseUnsafe = function (jsonString) {
        return JSON.parse(jsonString);
    };
    ApiParser.ParseListUnsafe = function (jsonString) {
        var items = new List_1.List();
        var resp = JSON.parse(jsonString);
        resp.forEach(function (modelListItem) {
            var model = modelListItem;
            items.add(model);
        });
        return items;
    };
    return ApiParser;
}());
exports.ApiParser = ApiParser;
//# sourceMappingURL=ApiParser.js.map