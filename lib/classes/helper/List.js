"use strict";
class List {
    constructor() {
        this.items = [];
    }
    size() {
        return this.items.length;
    }
    add(value) {
        this.items.push(value);
    }
    get(index) {
        return this.items[index];
    }
    first() {
        if (this.size() > 0) {
            return this.items[0];
        }
        else {
            return null;
        }
    }
    last() {
        if (this.size() > 0) {
            return this.items[this.size() - 1];
        }
        else {
            return null;
        }
    }
}
exports.List = List;
//# sourceMappingURL=List.js.map