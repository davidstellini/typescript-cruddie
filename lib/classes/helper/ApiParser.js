"use strict";
const List_1 = require("./List");
class ApiParser {
    static Parse(response) {
        return JSON.parse(response);
        //return (this.factory.create()).parse<T>(response);
    }
    static ParseList(response) {
        var items = new List_1.List();
        var resp = JSON.parse(response);
        resp.forEach(modelListItem => {
            var model = modelListItem;
            items.add(model);
        });
        return items;
    }
}
exports.ApiParser = ApiParser;
//# sourceMappingURL=ApiParser.js.map