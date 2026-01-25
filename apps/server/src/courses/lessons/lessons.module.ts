import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { Lesson, LessonSchema } from './models/lesson.schema';
import { LessonsRepository } from './lessons.repository';
import { CoursesRepository } from '../courses.repository';
import { Course, CourseSchema } from '../models/course.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService, LessonsRepository, CoursesRepository],
})
export class LessonsModule {}
