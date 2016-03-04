"use strict";
const List_1 = require("./List");
class ApiParser {
    static Parse(objType, jsonString) {
        var json = JSON.parse(jsonString);
        const newObj = new objType();
        const relationships = objType["relationships"] || {};
        for (const prop in json) {
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
                    console.warn(`Property ${prop} not set because it already existed on the object.`);
                }
            }
        }
        return newObj;
    }
    static ParseList(objType, jsonString) {
        var items = new List_1.List();
        var resp = JSON.parse(jsonString);
        resp.forEach(modelListItem => {
            var model = modelListItem;
            items.add(model);
        });
        return items;
    }
    static ParseUnsafe(jsonString) {
        return JSON.parse(jsonString);
    }
    static ParseListUnsafe(jsonString) {
        var items = new List_1.List();
        var resp = JSON.parse(jsonString);
        resp.forEach(modelListItem => {
            var model = modelListItem;
            items.add(model);
        });
        return items;
    }
}
exports.ApiParser = ApiParser;
//# sourceMappingURL=ApiParser.js.map