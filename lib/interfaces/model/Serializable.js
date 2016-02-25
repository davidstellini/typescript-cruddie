"use strict";
var Serializable = (function () {
    function Serializable() {
    }
    Serializable.prototype.FromJson = function (obj) {
        for (var property in obj) {
            this[property] = obj[property];
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
