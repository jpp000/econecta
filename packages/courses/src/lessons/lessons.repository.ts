import { AbstractRepository } from '@econecta/database';
import { Lesson } from './models/lesson.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class LessonsRepository extends AbstractRepository<Lesson> {
  protected logger: Logger = new Logger(LessonsRepository.name);

  constructor(@InjectModel(Lesson.name) lessonModel: Model<Lesson>) {
    super(lessonModel);
  }
}
