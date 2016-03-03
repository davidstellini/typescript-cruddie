"use strict";
class Serializable {
    FromJson(obj) {
        for (let property in obj) {
            this[property] = obj[property];
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
//# sourceMappingURL=Serializable.js.map