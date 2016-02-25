"use strict";
var List = (function () {
    function List() {
        this.items = [];
    }
    List.prototype.size = function () {
        return this.items.length;
    };
    List.prototype.add = function (value) {
        this.items.push(value);
    };
    List.prototype.get = function (index) {
        return this.items[index];
    };
    List.prototype.first = function () {
        if (this.size() > 0) {
            return this.items[0];
        }
        else {
            return null;
        }
    };
    List.prototype.last = function () {
        if (this.size() > 0) {
            return this.items[this.size() - 1];
        }
        else {
            return null;
        }
    };
    return List;
}());
exports.List = List;
