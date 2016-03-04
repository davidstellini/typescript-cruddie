"use strict";
//IMPORTANT : All properties of serializable class must be set to null/default.

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Serializable = function () {
    function Serializable() {
        _classCallCheck(this, Serializable);
    }

    _createClass(Serializable, [{
        key: "FromJson",
        value: function FromJson(obj) {
            for (var property in obj) {
                this[property] = obj[property]; //dangerous. Ideally we register the
            }
            ;
        }
    }, {
        key: "Stringify",
        value: function Stringify() {
            return JSON.stringify(this);
        }
    }, {
        key: "parse",
        value: function parse(string) {
            var outputObj = JSON.parse(string);
            return outputObj;
        }
    }]);

    return Serializable;
}();

exports.Serializable = Serializable;
//# sourceMappingURL=Serializable.js.map