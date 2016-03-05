"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function () {
    function List() {
        _classCallCheck(this, List);

        this.items = [];
    }

    _createClass(List, [{
        key: "size",
        value: function size() {
            return this.items.length;
        }
    }, {
        key: "add",
        value: function add(value) {
            this.items.push(value);
        }
    }, {
        key: "get",
        value: function get(index) {
            return this.items[index];
        }
    }, {
        key: "first",
        value: function first() {
            if (this.size() > 0) {
                return this.items[0];
            } else {
                return null;
            }
        }
    }, {
        key: "last",
        value: function last() {
            if (this.size() > 0) {
                return this.items[this.size() - 1];
            } else {
                return null;
            }
        }
    }]);

    return List;
}();

exports.List = List;
//# sourceMappingURL=List.js.map