// src/helpers/queryBuilder.ts

import { FilterQuery, Query, SortOrder } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);

    const filterConditions: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(queryObj)) {
      if (Array.isArray(value)) {
        filterConditions[key] = { $in: value };
      } else {
        filterConditions[key] = value;
      }
    }

    this.modelQuery = this.modelQuery.find(filterConditions as FilterQuery<T>);
    return this;
  }

  sort() {
    const sortBy = (this?.query?.sortBy as string) || 'createdAt';
    const sortOrder: SortOrder =
      this?.query?.sortOrder === 'desc' ? 'desc' : 'asc';

    const sortFields = sortBy.split(',');
    const sortQuery: [string, SortOrder][] = sortFields.map((field) => [
      field,
      sortOrder,
    ]);

    this.modelQuery = this.modelQuery.sort(sortQuery);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
