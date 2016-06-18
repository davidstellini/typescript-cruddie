"use strict";
const popsicle = require("popsicle");
class ApiRepository {
    constructor() {
        this.requestDecorator = null;
        this.parser = null; //new ApiParser<T>();
    }
    ///Return current url with no trailing slash
    getUrl() {
        throw new Error("You must either override getUrl() and supply a base URL value, or " +
            "provide your own implementation for find(), findAll() and all crud " +
            "operations in this class.");
    }
    exists(modelID) {
        throw new Error("Not implemented.");
    }
    getRange(modelIDList) {
        throw new Error("Not implemented.");
    }
    count() {
        throw new Error("Not implemented.");
    }
    findAllWith(query) {
        throw new Error("Not implemented.");
    }
    //Build request options
    buildReqOptions(requestType, url, model) {
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
    }
    buildRequestAndParseAsT(url, requestType, model, parser) {
        let options = this.buildReqOptions(requestType, url, model);
        return new Promise((resolve, reject) => {
            return popsicle.request(options).then((response) => {
                if (response.statusType() !== 2) {
                    reject(response);
                }
                var resp;
                try {
                    resp = parser.Parse(this.getModelType(), response.body);
                    resolve(resp);
                }
                catch (e) {
                    reject(e);
                }
            }).catch(r => { reject(r); });
        });
    }
    buildRequestAndParseAsTList(url, requestType, model, parser) {
        let options = this.buildReqOptions(requestType, url, model);
        return new Promise((resolve, reject) => {
            popsicle.request(options).then((response) => {
                if (response.statusType() !== 2) {
                    reject(response);
                }
                var resp;
                try {
                    resp = parser.ParseList(this.getModelType(), response.body);
                    resolve(resp);
                }
                catch (e) {
                    reject(e);
                }
            }).catch(r => { reject(r); });
        });
    }
    /** Makes a request. If model is not null, it will pass it to the request
    as JSON. It will parse the response using the parser function provided,
    encapsulated in a promise. Uses default item parser. */
    buildRequestAndParseAsModel(url, requestType, model) {
        return this.buildRequestAndParseAsT(url, requestType, model, this.parser);
    }
    //Build a request with list type.
    buildRequestAndParseAsModelList(url, requestType, model) {
        return this.buildRequestAndParseAsTList(url, requestType, model, this.parser);
    }
    find(modelID) {
        return this.buildRequestAndParseAsModel(this.getUrl() + '/' + modelID, 'GET', null);
    }
    findAll() {
        return this.buildRequestAndParseAsModelList(this.getUrl(), 'GET', null);
    }
    addItem(modelItem) {
        return this.buildRequestAndParseAsModel(this.getUrl(), 'POST', modelItem);
    }
    //TODO: Investigate - removeItem obviously won't return an item because it has been removed.
    // check how API is working
    removeItem(modelID) {
        return this.buildRequestAndParseAsModel(this.getUrl() + '/' + modelID, 'DELETE', null);
    }
    saveItem(modelItem, modelID) {
        return this.buildRequestAndParseAsModel(this.getUrl() + '/' + modelID, 'PUT', modelItem);
    }
}
exports.ApiRepository = ApiRepository;
//# sourceMappingURL=ApiRepository.js.map