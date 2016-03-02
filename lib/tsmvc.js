define("interfaces/model/Serializable", ["require", "exports"], function (require, exports) {
    "use strict";
    //IMPORTANT : All properties of serializable class must be set to null/default.
    class Serializable {
        FromJson(obj) {
            for (let property in obj) {
                this[property] = obj[property]; //dangerous. Ideally we register the
            }
            ;
        }
        Stringify() {
            return JSON.stringify(this);
        }
        parse(string) {
            var outputObj = JSON.parse(string);
            return outputObj;
        }
    }
    exports.Serializable = Serializable;
});
define("interfaces/model/modelFactory", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("interfaces/model/Model", ["require", "exports", "interfaces/model/Serializable"], function (require, exports, Serializable_1) {
    "use strict";
    class Model extends Serializable_1.Serializable {
        //Dynamically get index based on which property was marked with
        //@indexKey annotation.
        getIndex() {
            if (this['indexKey'] === undefined) {
                return null;
            }
            return this[this['indexKey']];
        }
    }
    exports.Model = Model;
    function indexKey(target, name) {
        target.indexKey = name;
    }
    exports.indexKey = indexKey;
});
define("classes/helper/List", ["require", "exports"], function (require, exports) {
    "use strict";
    class List {
        constructor() {
            this.items = [];
        }
        size() {
            return this.items.length;
        }
        add(value) {
            this.items.push(value);
        }
        get(index) {
            return this.items[index];
        }
        first() {
            if (this.size() > 0) {
                return this.items[0];
            }
            else {
                return null;
            }
        }
        last() {
            if (this.size() > 0) {
                return this.items[this.size() - 1];
            }
            else {
                return null;
            }
        }
    }
    exports.List = List;
});
define("classes/helper/ApiParser", ["require", "exports", "classes/helper/List"], function (require, exports, List_1) {
    "use strict";
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
});
define("interfaces/data/DataRepository", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("classes/helper/ApiRepository", ["require", "exports", "request-promise", "classes/helper/ApiParser"], function (require, exports, requestPromise, ApiParser_1) {
    "use strict";
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
                requestPromise(options).promise().then((response) => {
                    resolve(ApiParser_1.ApiParser.Parse(response));
                });
            });
        }
        buildRequestAndParseAsTList(url, requestType, model) {
            let options = this.buildReqOptions(requestType, url, model);
            return new Promise((resolve, reject) => {
                requestPromise(options).promise().then((response) => {
                    resolve(ApiParser_1.ApiParser.ParseList(response));
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
});
define("interfaces/model/Ctor", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("interfaces/service/Service", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("index", ["require", "exports", "classes/helper/ApiParser", "classes/helper/ApiRepository", "classes/helper/List", "interfaces/model/Model"], function (require, exports, ApiParser_2, ApiRepository_1, List_2, Model_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(ApiParser_2);
    __export(ApiRepository_1);
    __export(List_2);
    __export(Model_1);
});
//# sourceMappingURL=tsmvc.js.map