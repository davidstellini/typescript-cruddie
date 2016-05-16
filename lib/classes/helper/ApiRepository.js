"use strict";
var ApiParser_1 = require("./ApiParser");
var es6_promise_1 = require("es6-promise");
var popsicle = require("popsicle");
var ApiRepository = (function () {
    function ApiRepository() {
    }
    ApiRepository.prototype.exists = function (modelID) {
        throw new Error("Not implemented.");
    };
    ApiRepository.prototype.getRange = function (modelIDList) {
        throw new Error("Not implemented.");
    };
    ApiRepository.prototype.count = function () {
        throw new Error("Not implemented.");
    };
    ApiRepository.prototype.findAllWith = function (query) {
        throw new Error("Not implemented.");
    };
    //Build request options
    ApiRepository.prototype.buildReqOptions = function (requestType, url, model) {
        var options = {
            method: requestType,
            url: url
        };
        if (model !== null) {
            options['json'] = true;
            options['body'] = model;
        }
        return options;
    };
    ApiRepository.prototype.buildRequestAndParseAsT = function (url, requestType, model) {
        var _this = this;
        var options = this.buildReqOptions(requestType, url, model);
        return new es6_promise_1.Promise(function (resolve, reject) {
            return popsicle.request(options).then(function (response) {
                var resp;
                try {
                    resp = ApiParser_1.ApiParser.Parse(_this.getModelType(), response.body);
                    resolve(resp);
                }
                catch (e) {
                    reject(e);
                }
            }).catch(function (r) { reject(r); });
        });
    };
    ApiRepository.prototype.buildRequestAndParseAsTList = function (url, requestType, model) {
        var _this = this;
        var options = this.buildReqOptions(requestType, url, model);
        return new es6_promise_1.Promise(function (resolve, reject) {
            popsicle.request(options).then(function (response) {
                var resp;
                try {
                    resp = ApiParser_1.ApiParser.ParseList(_this.getModelType(), response.body);
                    resolve(resp);
                }
                catch (e) {
                    reject(e);
                }
            }).catch(function (r) { reject(r); });
        });
    };
    /** Makes a request. If model is not null, it will pass it to the request
    as JSON. It will parse the response using the parser function provided,
    encapsulated in a promise. Uses default item parser. */
    ApiRepository.prototype.buildRequestAndParseAsModel = function (url, requestType, model) {
        var options = this.buildReqOptions(requestType, url, model);
        return this.buildRequestAndParseAsT(url, requestType, model);
    };
    //Build a request with list type.
    ApiRepository.prototype.buildRequestAndParseAsModelList = function (url, requestType, model) {
        var options = this.buildReqOptions(requestType, url, model);
        return this.buildRequestAndParseAsTList(url, requestType, model);
    };
    ApiRepository.prototype.find = function (modelID) {
        return this.buildRequestAndParseAsModel(this.getUrl() + '/' + modelID, 'GET', null);
    };
    ApiRepository.prototype.findAll = function () {
        return this.buildRequestAndParseAsModelList(this.getUrl(), 'GET', null);
    };
    ApiRepository.prototype.addItem = function (modelItem) {
        return this.buildRequestAndParseAsModel(this.getUrl(), 'POST', modelItem);
    };
    //TODO: Investigate - removeItem obviously won't return an item because it has been removed.
    // check how API is working
    ApiRepository.prototype.removeItem = function (modelID) {
        return this.buildRequestAndParseAsModel(this.getUrl() + '/' + modelID, 'DELETE', null);
    };
    ApiRepository.prototype.saveItem = function (modelItem, modelID) {
        return this.buildRequestAndParseAsModel(this.getUrl() + '/' + modelID, 'PUT', modelItem);
    };
    return ApiRepository;
}());
exports.ApiRepository = ApiRepository;
//# sourceMappingURL=ApiRepository.js.map