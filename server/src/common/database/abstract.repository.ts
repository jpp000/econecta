import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    await createdDocument.save();

    return createdDocument.toJSON() as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument | null> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        'Document was not found with filterQuery: ',
        filterQuery,
      );
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      })
      .lean<TDocument>(true);

    return document;
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    populate: string | string[] = [],
  ): Promise<TDocument[]> {
    return this.model
      .find(filterQuery)
      .populate(populate)
      .lean<TDocument[]>(true);
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn(
        'Document was not found with filterQuery: ',
        filterQuery,
      );
      throw new NotFoundException('Document was not found');
    }

    return document;
  }
}
