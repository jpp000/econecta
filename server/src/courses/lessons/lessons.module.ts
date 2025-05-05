import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { Lesson, LessonSchema } from './models/lesson.schema';
import { LessonsRepository } from './lessons.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService, LessonsRepository],
})
export class LessonsModule {}
