import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { Course, CourseSchema } from './models/course.schema';
import { CoursesRepository } from './courses.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository],
})
export class CoursesModule {}
