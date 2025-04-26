import { AbstractRepository } from 'src/common/database/abstract.repository';
import { Event } from './models/event.schema';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EventsRepository extends AbstractRepository<Event> {
  protected readonly logger: Logger = new Logger(EventsRepository.name);

  constructor(
    @InjectModel(Event.name)
    eventModel: Model<Event>,
  ) {
    super(eventModel);
  }
}
