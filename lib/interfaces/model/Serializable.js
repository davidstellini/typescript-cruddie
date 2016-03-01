"use strict";
//IMPORTANT : All properties of serializable class must be set to null/default.
var Serializable = (function () {
    function Serializable() {
    }
    Serializable.prototype.FromJson = function (obj) {
        for (var property in obj) {
            this[property] = obj[property]; //dangerous. Ideally we register the
        }
        ;
    };
    Serializable.prototype.Stringify = function () {
        return JSON.stringify(this);
    };
    Serializable.prototype.parse = function (string) {
        var outputObj = JSON.parse(string);
        return outputObj;
    };
    return Serializable;
}());
exports.Serializable = Serializable;
