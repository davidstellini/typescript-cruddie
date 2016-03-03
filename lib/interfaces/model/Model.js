"use strict";
const Serializable_1 = require("./Serializable");
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
//# sourceMappingURL=Model.js.map