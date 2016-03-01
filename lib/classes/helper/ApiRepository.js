"use strict";
var requestPromise = require("request-promise");
var ApiParser_1 = require("./ApiParser");
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
    //Build request options
    ApiRepository.prototype.buildReqOptions = function (requestType, url, model) {
        var options = {
            method: requestType,
            uri: url
        };
        if (model !== null) {
            options['json'] = true;
            options['body'] = model;
        }
        return options;
    };
    ApiRepository.prototype.buildRequestAndParseAsT = function (url, requestType, model) {
        var options = this.buildReqOptions(requestType, url, model);
        return new Promise(function (resolve, reject) {
            requestPromise(options).promise().then(function (response) {
                resolve(ApiParser_1.ApiParser.Parse(response));
            });
        });
    };
    ApiRepository.prototype.buildRequestAndParseAsTList = function (url, requestType, model) {
        var options = this.buildReqOptions(requestType, url, model);
        return new Promise(function (resolve, reject) {
            requestPromise(options).promise().then(function (response) {
                resolve(ApiParser_1.ApiParser.ParseList(response));
            });
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
    ApiRepository.prototype.getItem = function (modelID) {
        return this.buildRequestAndParseAsModel(this.getUrl() + '/' + modelID, 'GET', null);
    };
    ApiRepository.prototype.getAllItems = function () {
        return this.buildRequestAndParseAsModelList(this.getUrl(), 'GET', null);
    };
    ApiRepository.prototype.addItem = function (modelItem) {
        return this.buildRequestAndParseAsModel(this.getUrl(), 'POST', modelItem);
    };
    //TODO: Investigate - removeItem obviously won't return an item because it has been removed.
    // check how API is working
    ApiRepository.prototype.removeItem = function (emptyModelWithID) {
        return this.buildRequestAndParseAsModel(this.getUrl() + '/' + emptyModelWithID, 'DELETE', null);
    };
    ApiRepository.prototype.saveItem = function (modelItem) {
        return this.buildRequestAndParseAsModel(this.getUrl(), 'PUT', modelItem);
    };
    return ApiRepository;
}());
exports.ApiRepository = ApiRepository;
