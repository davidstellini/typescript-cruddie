"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Serializable_1 = require("./Serializable");

var Model = function (_Serializable_1$Seria) {
    _inherits(Model, _Serializable_1$Seria);

    function Model() {
        _classCallCheck(this, Model);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Model).apply(this, arguments));
    }

    _createClass(Model, [{
        key: "getIndex",

        //Dynamically get index based on which property was marked with
        //@indexKey annotation.
        value: function getIndex() {
            if (this['indexKey'] === undefined) {
                return null;
            }
            return this[this['indexKey']];
        }
    }]);

    return Model;
}(Serializable_1.Serializable);

exports.Model = Model;
function indexKey(target, name) {
    target.indexKey = name;
}
exports.indexKey = indexKey;
//# sourceMappingURL=Model.js.map