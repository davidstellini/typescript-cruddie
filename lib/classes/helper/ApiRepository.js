"use strict";
var es6_promise_1 = require("es6-promise");
var popsicle = require("popsicle");
var ApiRepository = (function () {
    function ApiRepository() {
        this.requestDecorator = null;
        this.parser = null;
    }
    ApiRepository.prototype.getUrl = function () {
        throw new Error("You must either override getUrl() and supply a base URL value, or " +
            "provide your own implementation for find(), findAll() and all crud " +
            "operations in this class.");
    };
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
    ApiRepository.prototype.buildReqOptions = function (requestType, url, model) {
        var options = {
            method: requestType,
            url: url
        };
        if (model !== null) {
            options['json'] = true;
            options['body'] = model;
        }
        if (this.requestDecorator !== null) {
            options = this.requestDecorator.decorateRequest(options);
        }
        return options;
    };
    ApiRepository.prototype.buildRequestAndParseAsT = function (url, requestType, model, parser) {
        var _this = this;
        var options = this.buildReqOptions(requestType, url, model);
        return new es6_promise_1.Promise(function (resolve, reject) {
            return popsicle.request(options).then(function (response) {
                if (response.statusType() !== 2) {
                    reject(response);
                }
                var resp;
                try {
                    resp = parser.Parse(_this.getModelType(), response.body);
                    resolve(resp);
                }
                catch (e) {
                    reject(e);
                }
            }).catch(function (r) { reject(r); });
        });
    };
    ApiRepository.prototype.buildRequestAndParseAsTList = function (url, requestType, model, parser) {
        var _this = this;
        var options = this.buildReqOptions(requestType, url, model);
        return new es6_promise_1.Promise(function (resolve, reject) {
            popsicle.request(options).then(function (response) {
                if (response.statusType() !== 2) {
                    reject(response);
                }
                var resp;
                try {
                    resp = parser.ParseList(_this.getModelType(), response.body);
                    resolve(resp);
                }
                catch (e) {
                    reject(e);
                }
            }).catch(function (r) { reject(r); });
        });
    };
    ApiRepository.prototype.buildRequestAndParseAsModel = function (url, requestType, model) {
        return this.buildRequestAndParseAsT(url, requestType, model, this.parser);
    };
    ApiRepository.prototype.buildRequestAndParseAsModelList = function (url, requestType, model) {
        return this.buildRequestAndParseAsTList(url, requestType, model, this.parser);
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