"use strict";
var requestPromise = require("request-promise");
var DefaultApiParser_1 = require("./DefaultApiParser");
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
    ApiRepository.prototype.buildRequestAndParseAsT = function (url, requestType, parser, model) {
        var options = this.buildReqOptions(requestType, url, model);
        return new Promise(function (resolve, reject) {
            requestPromise(options).promise().then(function (response) {
                resolve(parser.Parse(response));
            });
        });
    };
    ApiRepository.prototype.buildRequestAndParseAsTList = function (url, requestType, parser, model) {
        var options = this.buildReqOptions(requestType, url, model);
        return new Promise(function (resolve, reject) {
            requestPromise(options).promise().then(function (response) {
                resolve(parser.ParseList(response));
            });
        });
    };
    ApiRepository.prototype.buildRequestAndParseAsModel = function (url, requestType, model) {
        var options = this.buildReqOptions(requestType, url, model);
        var responseParser = new DefaultApiParser_1.DefaultApiParser(this.factory);
        return this.buildRequestAndParseAsT(url, requestType, responseParser, model);
    };
    ApiRepository.prototype.buildRequestAndParseAsModelList = function (url, requestType, model) {
        var options = this.buildReqOptions(requestType, url, model);
        var responseParser = new DefaultApiParser_1.DefaultApiParser(this.factory);
        return this.buildRequestAndParseAsTList(url, requestType, responseParser, model);
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
    ApiRepository.prototype.removeItem = function (emptyModelWithID) {
        return this.buildRequestAndParseAsModel(this.getUrl() + '/' + emptyModelWithID, 'DELETE', null);
    };
    ApiRepository.prototype.saveItem = function (modelItem) {
        return this.buildRequestAndParseAsModel(this.getUrl(), 'PUT', modelItem);
    };
    return ApiRepository;
}());
exports.ApiRepository = ApiRepository;
