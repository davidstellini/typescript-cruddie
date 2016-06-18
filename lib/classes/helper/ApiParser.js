"use strict";
const List_1 = require("./List");
class ApiParser {
    Parse(objType, json) {
        const newObj = new objType();
        const relationships = objType["relationships"] || {};
        for (const prop in json) {
            if (json.hasOwnProperty(prop)) {
                if (newObj[prop] == null) {
                    if (relationships[prop] == null) {
                        newObj[prop] = json[prop];
                    }
                    else {
                        newObj[prop] = this.Parse(relationships[prop], json[prop]);
                    }
                }
                else {
                    console.warn(`Property ${prop} not set because it already existed on the object.`);
                }
            }
        }
        return newObj;
    }
    ParseList(objType, jsonString) {
        var json = JSON.parse(jsonString);
        var items = new List_1.List();
        if (!Array.isArray(json)) {
            throw ("Invalid response: " + jsonString);
        }
        json.forEach(modelListItem => {
            var model = modelListItem;
            items.add(model);
        });
        return items;
    }
}
exports.ApiParser = ApiParser;
//# sourceMappingURL=ApiParser.js.map