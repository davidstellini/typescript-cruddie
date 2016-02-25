/**
 * inversify v.1.3.0 - A lightweight IoC container written in TypeScript.
 * Copyright (c) 2015 Remo H. Jansen
 * MIT inversify.io/LICENSE
 * http://inversify.io
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.inversify = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Inject = function () {
    var typeIdentifiers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        typeIdentifiers[_i - 0] = arguments[_i];
    }
    return function (constructor) {
        constructor.__INJECT = typeIdentifiers;
        return constructor;
    };
};
exports.Inject = Inject;

},{}],2:[function(require,module,exports){
var kernel_1 = require("./kernel");
exports.Kernel = kernel_1.Kernel;
var type_binding_1 = require("./type_binding");
exports.TypeBinding = type_binding_1.TypeBinding;
var type_binding_scope_1 = require("./type_binding_scope");
exports.TypeBindingScopeEnum = type_binding_scope_1.TypeBindingScopeEnum;
var inject_annotation_1 = require("./inject_annotation");
exports.Inject = inject_annotation_1.Inject;

},{"./inject_annotation":1,"./kernel":3,"./type_binding":5,"./type_binding_scope":6}],3:[function(require,module,exports){
var type_binding_scope_1 = require("./type_binding_scope");
var lookup_1 = require("./lookup");
var Kernel = (function () {
    function Kernel() {
        this._bindingDictionary = new lookup_1.Lookup();
    }
    Kernel.prototype.bind = function (typeBinding) {
        this._bindingDictionary.add(typeBinding.runtimeIdentifier, typeBinding);
    };
    Kernel.prototype.unbind = function (runtimeIdentifier) {
        try {
            this._bindingDictionary.remove(runtimeIdentifier);
        }
        catch (e) {
            throw new Error("Could not resolve service " + runtimeIdentifier);
        }
    };
    Kernel.prototype.unbindAll = function () {
        this._bindingDictionary = new lookup_1.Lookup();
    };
    Kernel.prototype.resolve = function (runtimeIdentifier) {
        var bindings;
        if (this._bindingDictionary.hasKey(runtimeIdentifier)) {
            bindings = this._bindingDictionary.get(runtimeIdentifier);
        }
        else {
            return null;
        }
        var binding = bindings[0];
        if ((binding.scope === type_binding_scope_1.TypeBindingScopeEnum.Singleton) && (binding.cache !== null)) {
            return binding.cache;
        }
        else {
            var result = this._injectDependencies(binding.implementationType);
            binding.cache = result;
            return result;
        }
    };
    Kernel.prototype._getConstructorArguments = function (func) {
        var typeIdentifiers = func.__INJECT || [];
        return typeIdentifiers;
    };
    Kernel.prototype._injectDependencies = function (func) {
        var args = this._getConstructorArguments(func);
        if (args.length === 0) {
            return new func();
        }
        else {
            var injections = [], implementation = null;
            for (var i = 0; i < args.length; i++) {
                var service = args[i];
                implementation = this.resolve(service);
                injections.push(implementation);
            }
            return this._construct(func, injections);
        }
    };
    Kernel.prototype._construct = function (constr, args) {
        return new (Function.prototype.bind.apply(constr, [null].concat(args)));
    };
    return Kernel;
})();
exports.Kernel = Kernel;

},{"./lookup":4,"./type_binding_scope":6}],4:[function(require,module,exports){
var KeyValuePair = (function () {
    function KeyValuePair(key, value) {
        this.key = key;
        this.value = new Array();
        this.value.push(value);
    }
    return KeyValuePair;
})();
var Lookup = (function () {
    function Lookup() {
        this._hashMap = new Array();
    }
    Lookup.prototype.getIndexByKey = function (key) {
        var index = -1;
        for (var i = 0; i < this._hashMap.length; i++) {
            var keyValuePair = this._hashMap[i];
            if (keyValuePair.key === key) {
                index = i;
            }
        }
        return index;
    };
    Lookup.prototype.add = function (key, value) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        if (value === null || value === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            var keyValuePair = this._hashMap[index];
            keyValuePair.value.push(value);
        }
        else {
            this._hashMap.push(new KeyValuePair(key, value));
        }
    };
    Lookup.prototype.get = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            var keyValuePair = this._hashMap[index];
            return keyValuePair.value;
        }
        else {
            throw new Error("Key Not Found");
        }
    };
    Lookup.prototype.remove = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            this._hashMap.splice(index, 1);
        }
        else {
            throw new Error("Key Not Found");
        }
    };
    Lookup.prototype.hasKey = function (key) {
        if (key === null || key === undefined)
            throw new Error("Argument Null");
        var index = this.getIndexByKey(key);
        if (index !== -1) {
            return true;
        }
        else {
            return false;
        }
    };
    return Lookup;
})();
exports.Lookup = Lookup;

},{}],5:[function(require,module,exports){
var type_binding_scope_1 = require("./type_binding_scope");
var TypeBinding = (function () {
    function TypeBinding(runtimeIdentifier, implementationType, scopeType) {
        this.runtimeIdentifier = runtimeIdentifier;
        this.implementationType = implementationType;
        this.cache = null;
        if (typeof scopeType === "undefined") {
            this.scope = type_binding_scope_1.TypeBindingScopeEnum.Transient;
        }
        else {
            if (type_binding_scope_1.TypeBindingScopeEnum[scopeType]) {
                this.scope = scopeType;
            }
            else {
                var msg = "Invalid scope type " + scopeType;
                throw new Error(msg);
            }
        }
    }
    return TypeBinding;
})();
exports.TypeBinding = TypeBinding;

},{"./type_binding_scope":6}],6:[function(require,module,exports){
var TypeBindingScopeEnum;
(function (TypeBindingScopeEnum) {
    TypeBindingScopeEnum[TypeBindingScopeEnum["Transient"] = 0] = "Transient";
    TypeBindingScopeEnum[TypeBindingScopeEnum["Singleton"] = 1] = "Singleton";
})(TypeBindingScopeEnum || (TypeBindingScopeEnum = {}));
exports.TypeBindingScopeEnum = TypeBindingScopeEnum;

},{}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9zb3VyY2UvaW5qZWN0X2Fubm90YXRpb24uanMiLCJidWlsZC9zb3VyY2UvaW52ZXJzaWZ5LmpzIiwiYnVpbGQvc291cmNlL2tlcm5lbC5qcyIsImJ1aWxkL3NvdXJjZS9sb29rdXAuanMiLCJidWlsZC9zb3VyY2UvdHlwZV9iaW5kaW5nLmpzIiwiYnVpbGQvc291cmNlL3R5cGVfYmluZGluZ19zY29wZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBJbmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHR5cGVJZGVudGlmaWVycyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHR5cGVJZGVudGlmaWVyc1tfaSAtIDBdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICBjb25zdHJ1Y3Rvci5fX0lOSkVDVCA9IHR5cGVJZGVudGlmaWVycztcbiAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgIH07XG59O1xuZXhwb3J0cy5JbmplY3QgPSBJbmplY3Q7XG4iLCJ2YXIga2VybmVsXzEgPSByZXF1aXJlKFwiLi9rZXJuZWxcIik7XG5leHBvcnRzLktlcm5lbCA9IGtlcm5lbF8xLktlcm5lbDtcbnZhciB0eXBlX2JpbmRpbmdfMSA9IHJlcXVpcmUoXCIuL3R5cGVfYmluZGluZ1wiKTtcbmV4cG9ydHMuVHlwZUJpbmRpbmcgPSB0eXBlX2JpbmRpbmdfMS5UeXBlQmluZGluZztcbnZhciB0eXBlX2JpbmRpbmdfc2NvcGVfMSA9IHJlcXVpcmUoXCIuL3R5cGVfYmluZGluZ19zY29wZVwiKTtcbmV4cG9ydHMuVHlwZUJpbmRpbmdTY29wZUVudW0gPSB0eXBlX2JpbmRpbmdfc2NvcGVfMS5UeXBlQmluZGluZ1Njb3BlRW51bTtcbnZhciBpbmplY3RfYW5ub3RhdGlvbl8xID0gcmVxdWlyZShcIi4vaW5qZWN0X2Fubm90YXRpb25cIik7XG5leHBvcnRzLkluamVjdCA9IGluamVjdF9hbm5vdGF0aW9uXzEuSW5qZWN0O1xuIiwidmFyIHR5cGVfYmluZGluZ19zY29wZV8xID0gcmVxdWlyZShcIi4vdHlwZV9iaW5kaW5nX3Njb3BlXCIpO1xudmFyIGxvb2t1cF8xID0gcmVxdWlyZShcIi4vbG9va3VwXCIpO1xudmFyIEtlcm5lbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gS2VybmVsKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeSA9IG5ldyBsb29rdXBfMS5Mb29rdXAoKTtcbiAgICB9XG4gICAgS2VybmVsLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKHR5cGVCaW5kaW5nKSB7XG4gICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LmFkZCh0eXBlQmluZGluZy5ydW50aW1lSWRlbnRpZmllciwgdHlwZUJpbmRpbmcpO1xuICAgIH07XG4gICAgS2VybmVsLnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbiAocnVudGltZUlkZW50aWZpZXIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LnJlbW92ZShydW50aW1lSWRlbnRpZmllcik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCByZXNvbHZlIHNlcnZpY2UgXCIgKyBydW50aW1lSWRlbnRpZmllcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEtlcm5lbC5wcm90b3R5cGUudW5iaW5kQWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9iaW5kaW5nRGljdGlvbmFyeSA9IG5ldyBsb29rdXBfMS5Mb29rdXAoKTtcbiAgICB9O1xuICAgIEtlcm5lbC5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uIChydW50aW1lSWRlbnRpZmllcikge1xuICAgICAgICB2YXIgYmluZGluZ3M7XG4gICAgICAgIGlmICh0aGlzLl9iaW5kaW5nRGljdGlvbmFyeS5oYXNLZXkocnVudGltZUlkZW50aWZpZXIpKSB7XG4gICAgICAgICAgICBiaW5kaW5ncyA9IHRoaXMuX2JpbmRpbmdEaWN0aW9uYXJ5LmdldChydW50aW1lSWRlbnRpZmllcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYmluZGluZyA9IGJpbmRpbmdzWzBdO1xuICAgICAgICBpZiAoKGJpbmRpbmcuc2NvcGUgPT09IHR5cGVfYmluZGluZ19zY29wZV8xLlR5cGVCaW5kaW5nU2NvcGVFbnVtLlNpbmdsZXRvbikgJiYgKGJpbmRpbmcuY2FjaGUgIT09IG51bGwpKSB7XG4gICAgICAgICAgICByZXR1cm4gYmluZGluZy5jYWNoZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9pbmplY3REZXBlbmRlbmNpZXMoYmluZGluZy5pbXBsZW1lbnRhdGlvblR5cGUpO1xuICAgICAgICAgICAgYmluZGluZy5jYWNoZSA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEtlcm5lbC5wcm90b3R5cGUuX2dldENvbnN0cnVjdG9yQXJndW1lbnRzID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgdmFyIHR5cGVJZGVudGlmaWVycyA9IGZ1bmMuX19JTkpFQ1QgfHwgW107XG4gICAgICAgIHJldHVybiB0eXBlSWRlbnRpZmllcnM7XG4gICAgfTtcbiAgICBLZXJuZWwucHJvdG90eXBlLl9pbmplY3REZXBlbmRlbmNpZXMgPSBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICB2YXIgYXJncyA9IHRoaXMuX2dldENvbnN0cnVjdG9yQXJndW1lbnRzKGZ1bmMpO1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgZnVuYygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGluamVjdGlvbnMgPSBbXSwgaW1wbGVtZW50YXRpb24gPSBudWxsO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlcnZpY2UgPSBhcmdzW2ldO1xuICAgICAgICAgICAgICAgIGltcGxlbWVudGF0aW9uID0gdGhpcy5yZXNvbHZlKHNlcnZpY2UpO1xuICAgICAgICAgICAgICAgIGluamVjdGlvbnMucHVzaChpbXBsZW1lbnRhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uc3RydWN0KGZ1bmMsIGluamVjdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBLZXJuZWwucHJvdG90eXBlLl9jb25zdHJ1Y3QgPSBmdW5jdGlvbiAoY29uc3RyLCBhcmdzKSB7XG4gICAgICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KGNvbnN0ciwgW251bGxdLmNvbmNhdChhcmdzKSkpO1xuICAgIH07XG4gICAgcmV0dXJuIEtlcm5lbDtcbn0pKCk7XG5leHBvcnRzLktlcm5lbCA9IEtlcm5lbDtcbiIsInZhciBLZXlWYWx1ZVBhaXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEtleVZhbHVlUGFpcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgICAgICB0aGlzLnZhbHVlID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMudmFsdWUucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBLZXlWYWx1ZVBhaXI7XG59KSgpO1xudmFyIExvb2t1cCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTG9va3VwKCkge1xuICAgICAgICB0aGlzLl9oYXNoTWFwID0gbmV3IEFycmF5KCk7XG4gICAgfVxuICAgIExvb2t1cC5wcm90b3R5cGUuZ2V0SW5kZXhCeUtleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5faGFzaE1hcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGtleVZhbHVlUGFpciA9IHRoaXMuX2hhc2hNYXBbaV07XG4gICAgICAgICAgICBpZiAoa2V5VmFsdWVQYWlyLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gbnVsbCB8fCBrZXkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50IE51bGxcIik7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgTnVsbFwiKTtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleEJ5S2V5KGtleSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHZhciBrZXlWYWx1ZVBhaXIgPSB0aGlzLl9oYXNoTWFwW2luZGV4XTtcbiAgICAgICAgICAgIGtleVZhbHVlUGFpci52YWx1ZS5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2hhc2hNYXAucHVzaChuZXcgS2V5VmFsdWVQYWlyKGtleSwgdmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTG9va3VwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT09IG51bGwgfHwga2V5ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcmd1bWVudCBOdWxsXCIpO1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldEluZGV4QnlLZXkoa2V5KTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdmFyIGtleVZhbHVlUGFpciA9IHRoaXMuX2hhc2hNYXBbaW5kZXhdO1xuICAgICAgICAgICAgcmV0dXJuIGtleVZhbHVlUGFpci52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIktleSBOb3QgRm91bmRcIik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgTnVsbFwiKTtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleEJ5S2V5KGtleSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2hhc2hNYXAuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIktleSBOb3QgRm91bmRcIik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExvb2t1cC5wcm90b3R5cGUuaGFzS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSBudWxsIHx8IGtleSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgTnVsbFwiKTtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRJbmRleEJ5S2V5KGtleSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gTG9va3VwO1xufSkoKTtcbmV4cG9ydHMuTG9va3VwID0gTG9va3VwO1xuIiwidmFyIHR5cGVfYmluZGluZ19zY29wZV8xID0gcmVxdWlyZShcIi4vdHlwZV9iaW5kaW5nX3Njb3BlXCIpO1xudmFyIFR5cGVCaW5kaW5nID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUeXBlQmluZGluZyhydW50aW1lSWRlbnRpZmllciwgaW1wbGVtZW50YXRpb25UeXBlLCBzY29wZVR5cGUpIHtcbiAgICAgICAgdGhpcy5ydW50aW1lSWRlbnRpZmllciA9IHJ1bnRpbWVJZGVudGlmaWVyO1xuICAgICAgICB0aGlzLmltcGxlbWVudGF0aW9uVHlwZSA9IGltcGxlbWVudGF0aW9uVHlwZTtcbiAgICAgICAgdGhpcy5jYWNoZSA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2Ygc2NvcGVUeXBlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3BlID0gdHlwZV9iaW5kaW5nX3Njb3BlXzEuVHlwZUJpbmRpbmdTY29wZUVudW0uVHJhbnNpZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVfYmluZGluZ19zY29wZV8xLlR5cGVCaW5kaW5nU2NvcGVFbnVtW3Njb3BlVHlwZV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGVUeXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IFwiSW52YWxpZCBzY29wZSB0eXBlIFwiICsgc2NvcGVUeXBlO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBUeXBlQmluZGluZztcbn0pKCk7XG5leHBvcnRzLlR5cGVCaW5kaW5nID0gVHlwZUJpbmRpbmc7XG4iLCJ2YXIgVHlwZUJpbmRpbmdTY29wZUVudW07XG4oZnVuY3Rpb24gKFR5cGVCaW5kaW5nU2NvcGVFbnVtKSB7XG4gICAgVHlwZUJpbmRpbmdTY29wZUVudW1bVHlwZUJpbmRpbmdTY29wZUVudW1bXCJUcmFuc2llbnRcIl0gPSAwXSA9IFwiVHJhbnNpZW50XCI7XG4gICAgVHlwZUJpbmRpbmdTY29wZUVudW1bVHlwZUJpbmRpbmdTY29wZUVudW1bXCJTaW5nbGV0b25cIl0gPSAxXSA9IFwiU2luZ2xldG9uXCI7XG59KShUeXBlQmluZGluZ1Njb3BlRW51bSB8fCAoVHlwZUJpbmRpbmdTY29wZUVudW0gPSB7fSkpO1xuZXhwb3J0cy5UeXBlQmluZGluZ1Njb3BlRW51bSA9IFR5cGVCaW5kaW5nU2NvcGVFbnVtO1xuIl19
