"use strict";
const ApiParser_1 = require("./ApiParser");
const popsicle = require("popsicle");
class ApiRepository {
    exists(modelID) {
        throw new Error("Not implemented.");
    }
    getRange(modelIDList) {
        throw new Error("Not implemented.");
    }
    count() {
        throw new Error("Not implemented.");
    }
    //Build request options
    buildReqOptions(requestType, url, model) {
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
    buildRequestAndParseAsT(url, requestType, model) {
        let options = this.buildReqOptions(requestType, url, model);
        return new Promise((resolve, reject) => {
            popsicle.request(options).then((response) => {
                resolve(ApiParser_1.ApiParser.Parse(this.getModelType(), response.body));
            });
        });
    }
    buildRequestAndParseAsTList(url, requestType, model) {
        let options = this.buildReqOptions(requestType, url, model);
        return new Promise((resolve, reject) => {
            popsicle.request(options).then((response) => {
                resolve(ApiParser_1.ApiParser.ParseList(this.getModelType(), response.body));
            });
        });
    }
    /** Makes a request. If model is not null, it will pass it to the request
    as JSON. It will parse the response using the parser function provided,
    encapsulated in a promise. Uses default item parser. */
    buildRequestAndParseAsModel(url, requestType, model) {
        let options = this.buildReqOptions(requestType, url, model);
        return this.buildRequestAndParseAsT(url, requestType, model);
    }
    //Build a request with list type.
    buildRequestAndParseAsModelList(url, requestType, model) {
        let options = this.buildReqOptions(requestType, url, model);
        return this.buildRequestAndParseAsTList(url, requestType, model);
    }
    getItem(modelID) {
        return this.buildRequestAndParseAsModel(this.getUrl() + '/' + modelID, 'GET', null);
    }
    getAllItems() {
        return this.buildRequestAndParseAsModelList(this.getUrl(), 'GET', null);
    }
    addItem(modelItem) {
        return this.buildRequestAndParseAsModel(this.getUrl(), 'POST', modelItem);
    }
    //TODO: Investigate - removeItem obviously won't return an item because it has been removed.
    // check how API is working
    removeItem(emptyModelWithID) {
        return this.buildRequestAndParseAsModel(this.getUrl() + '/' + emptyModelWithID, 'DELETE', null);
    }
    saveItem(modelItem) {
        return this.buildRequestAndParseAsModel(this.getUrl(), 'PUT', modelItem);
    }
}
exports.ApiRepository = ApiRepository;
//# sourceMappingURL=ApiRepository.js.map