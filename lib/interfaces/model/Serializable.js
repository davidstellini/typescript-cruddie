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
//# sourceMappingURL=Serializable.js.map