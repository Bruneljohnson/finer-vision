import { IAPIQueryString, IQueryObj } from '../types/UtilitiesType.model';

export const APIFeatures = class {
  query: any;
  queryString: {
    [props: string]: string;
  };

  constructor(
    query: any,
    queryString: {
      [props: string]: string;
    }
  ) {
    //MODEL.FIND() is this.query
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    let queryObj: IQueryObj | string = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'fields', 'limit'];
    if (typeof queryObj !== 'string') {
      excludeFields.forEach((field) => {
        if (field in (queryObj as IQueryObj)) {
          delete (queryObj as IQueryObj)[field];
        }
      });
    }
    console.log(queryObj);

    queryObj = JSON.stringify(queryObj);
    queryObj = JSON.parse(
      queryObj.replace(/\b(gte|lte|gt|lt)\b/g, (matched) => `$${matched}`)
    );

    this.query = this.query.find(queryObj);
    return this;
  }
  sort() {
    let sortBy: string;
    if (this.queryString.sort) {
      sortBy = this.queryString.sort.replace(/,/g, ' ');
    } else {
      sortBy = '-createdAt';
    }

    this.query = this.query.sort(sortBy);
    return this;
  }

  fields() {
    let fields: string;
    if (this.queryString.fields) {
      fields = this.queryString.fields.replace(/,/g, ' ');
    } else {
      fields = '-__v';
    }

    this.query = this.query.select(fields);
    return this;
  }

  paginate() {
    const page = +this.queryString?.page ?? 1;
    const limit = +this.queryString?.limit ?? 10;
    const skipped = (page - 1) * limit;

    this.query = this.query.skip(skipped).limit(limit);
    return this;
  }
};
