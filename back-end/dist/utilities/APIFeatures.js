"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFeatures = void 0;
const APIFeatures = class {
    constructor(query, queryString) {
        //MODEL.FIND() is this.query
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        let queryObj = Object.assign({}, this.queryString);
        const excludeFields = ['page', 'sort', 'fields', 'limit'];
        if (typeof queryObj !== 'string') {
            excludeFields.forEach((field) => {
                if (field in queryObj) {
                    delete queryObj[field];
                }
            });
        }
        console.log(queryObj);
        queryObj = JSON.stringify(queryObj);
        queryObj = JSON.parse(queryObj.replace(/\b(gte|lte|gt|lt)\b/g, (matched) => `$${matched}`));
        this.query = this.query.find(queryObj);
        return this;
    }
    sort() {
        let sortBy;
        if (this.queryString.sort) {
            sortBy = this.queryString.sort.replace(/,/g, ' ');
        }
        else {
            sortBy = '-createdAt';
        }
        this.query = this.query.sort(sortBy);
        return this;
    }
    fields() {
        let fields;
        if (this.queryString.fields) {
            fields = this.queryString.fields.replace(/,/g, ' ');
        }
        else {
            fields = '-__v';
        }
        this.query = this.query.select(fields);
        return this;
    }
    paginate() {
        var _a, _b, _c, _d;
        const page = (_b = +((_a = this.queryString) === null || _a === void 0 ? void 0 : _a.page)) !== null && _b !== void 0 ? _b : 1;
        const limit = (_d = +((_c = this.queryString) === null || _c === void 0 ? void 0 : _c.limit)) !== null && _d !== void 0 ? _d : 10;
        const skipped = (page - 1) * limit;
        this.query = this.query.skip(skipped).limit(limit);
        return this;
    }
};
exports.APIFeatures = APIFeatures;
