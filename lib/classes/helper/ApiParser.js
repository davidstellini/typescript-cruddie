"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List_1 = require("./List");

var ApiParser = function () {
    function ApiParser() {
        _classCallCheck(this, ApiParser);
    }

    _createClass(ApiParser, null, [{
        key: "Parse",
        value: function Parse(objType, json) {
            var newObj = new objType();
            var relationships = objType["relationships"] || {};
            for (var prop in json) {
                if (json.hasOwnProperty(prop)) {
                    if (newObj[prop] == null) {
                        if (relationships[prop] == null) {
                            newObj[prop] = json[prop];
                        } else {
                            newObj[prop] = ApiParser.Parse(relationships[prop], json[prop]);
                        }
                    } else {
                        console.warn("Property " + prop + " not set because it already existed on the object.");
                    }
                }
            }
            return newObj;
        }
    }, {
        key: "ParseList",
        value: function ParseList(objType, json) {
            var items = new List_1.List();
            json.forEach(function (modelListItem) {
                var model = modelListItem;
                items.add(model);
            });
            return items;
        }
    }, {
        key: "ParseUnsafe",
        value: function ParseUnsafe(jsonString) {
            return JSON.parse(jsonString);
        }
    }, {
        key: "ParseListUnsafe",
        value: function ParseListUnsafe(jsonString) {
            var items = new List_1.List();
            var resp = JSON.parse(jsonString);
            resp.forEach(function (modelListItem) {
                var model = modelListItem;
                items.add(model);
            });
            return items;
        }
    }]);

    return ApiParser;
}();

exports.ApiParser = ApiParser;
//# sourceMappingURL=ApiParser.js.map