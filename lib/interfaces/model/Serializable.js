"use strict";
//IMPORTANT : All properties of serializable class must be set to null/default.
class Serializable {
    //reads object into properties of current object
    readInto(obj) {
        for (let property in obj) {
            this[property] = obj[property]; //dangerous. Ideally we register the
        }
        ;
    }
    stringify() {
        return JSON.stringify(this);
    }
}
exports.Serializable = Serializable;
//# sourceMappingURL=Serializable.js.map