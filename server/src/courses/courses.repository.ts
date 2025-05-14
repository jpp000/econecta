import { AbstractRepository } from 'src/common/database/abstract.repository';
import { Course } from './models/course.schema';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class CoursesRepository extends AbstractRepository<Course> {
  protected logger: Logger = new Logger(CoursesRepository.name);

  constructor(@InjectModel(Course.name) courseModel: Model<Course>) {
    super(courseModel);
  }

  async findAll() {
    return this.model.find({}).populate('lessons').exec();
  }

  async addLesson(courseId: string, lessonId: string) {
    return this.model.findByIdAndUpdate(courseId, {
      $push: { lessons: lessonId },
    });
  }
}
