import { Injectable, Logger } from '@nestjs/common';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventDto } from './dto/get-event.dto';
import { EventsRepository } from './events.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './models/event.schema';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private readonly eventsRepository: EventsRepository,
    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventDto & { creator: string }) {
    try {
      return await this.eventsRepository.create(createEventDto);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.eventModel
        .find()
        .populate('creator', {
          password: 0,
          __v: 0,
        })
        .lean(true);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  findOne({ _id }: GetEventDto) {
    return this.eventsRepository.findOne({ _id });
  }

  async updateEvent(updateEventDto: UpdateEventDto) {
    try {
      return await this.eventsRepository.findOneAndUpdate(
        { _id: updateEventDto._id },
        { ...updateEventDto },
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove({ _id }: GetEventDto) {
    try {
      const event = await this.eventsRepository.findOneAndDelete({ _id });

      if (!event) {
        throw new Error('Event not found');
      }

      return event;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
