"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiParser_1 = require("./ApiParser");
var popsicle = require("popsicle");

var ApiRepository = function () {
    function ApiRepository() {
        _classCallCheck(this, ApiRepository);
    }

    _createClass(ApiRepository, [{
        key: "exists",
        value: function exists(modelID) {
            throw new Error("Not implemented.");
        }
    }, {
        key: "getRange",
        value: function getRange(modelIDList) {
            throw new Error("Not implemented.");
        }
    }, {
        key: "count",
        value: function count() {
            throw new Error("Not implemented.");
        }
        //Build request options

    }, {
        key: "buildReqOptions",
        value: function buildReqOptions(requestType, url, model) {
            var options = {
                method: requestType,
                uri: url
            };
            if (model !== null) {
                options['json'] = true;
                options['body'] = model;
            }
            return options;
        }
    }, {
        key: "buildRequestAndParseAsT",
        value: function buildRequestAndParseAsT(url, requestType, model) {
            var options = this.buildReqOptions(requestType, url, model);
            return new Promise(function (resolve, reject) {
                popsicle.request(options).then(function (response) {
                    resolve(ApiParser_1.ApiParser.Parse(response.body));
                });
            });
        }
    }, {
        key: "buildRequestAndParseAsTList",
        value: function buildRequestAndParseAsTList(url, requestType, model) {
            var options = this.buildReqOptions(requestType, url, model);
            return new Promise(function (resolve, reject) {
                popsicle.request(options).then(function (response) {
                    resolve(ApiParser_1.ApiParser.ParseList(response.body));
                });
            });
        }
        /** Makes a request. If model is not null, it will pass it to the request
        as JSON. It will parse the response using the parser function provided,
        encapsulated in a promise. Uses default item parser. */

    }, {
        key: "buildRequestAndParseAsModel",
        value: function buildRequestAndParseAsModel(url, requestType, model) {
            var options = this.buildReqOptions(requestType, url, model);
            return this.buildRequestAndParseAsT(url, requestType, model);
        }
        //Build a request with list type.

    }, {
        key: "buildRequestAndParseAsModelList",
        value: function buildRequestAndParseAsModelList(url, requestType, model) {
            var options = this.buildReqOptions(requestType, url, model);
            return this.buildRequestAndParseAsTList(url, requestType, model);
        }
    }, {
        key: "getItem",
        value: function getItem(modelID) {
            return this.buildRequestAndParseAsModel(this.getUrl() + '/' + modelID, 'GET', null);
        }
    }, {
        key: "getAllItems",
        value: function getAllItems() {
            return this.buildRequestAndParseAsModelList(this.getUrl(), 'GET', null);
        }
    }, {
        key: "addItem",
        value: function addItem(modelItem) {
            return this.buildRequestAndParseAsModel(this.getUrl(), 'POST', modelItem);
        }
        //TODO: Investigate - removeItem obviously won't return an item because it has been removed.
        // check how API is working

    }, {
        key: "removeItem",
        value: function removeItem(emptyModelWithID) {
            return this.buildRequestAndParseAsModel(this.getUrl() + '/' + emptyModelWithID, 'DELETE', null);
        }
    }, {
        key: "saveItem",
        value: function saveItem(modelItem) {
            return this.buildRequestAndParseAsModel(this.getUrl(), 'PUT', modelItem);
        }
    }]);

    return ApiRepository;
}();

exports.ApiRepository = ApiRepository;
//# sourceMappingURL=ApiRepository.js.map