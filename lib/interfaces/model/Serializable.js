"use strict";
//IMPORTANT : All properties of serializable class must be set to null/default.
var Serializable = (function () {
    function Serializable() {
    }
    //reads object into properties of current object
    Serializable.prototype.readInto = function (obj) {
        for (var property in obj) {
            this[property] = obj[property]; //dangerous. Ideally we register the
        }
        ;
    };
    Serializable.prototype.stringify = function () {
        return JSON.stringify(this);
    };
    return Serializable;
}());
exports.Serializable = Serializable;
//# sourceMappingURL=Serializable.js.map