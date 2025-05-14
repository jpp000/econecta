import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsRepository } from './lessons.repository';
import { GetLessonDto } from './dto/get-lesson.dto';

@Injectable()
export class LessonsService {
  private readonly logger: Logger = new Logger(LessonsService.name);

  constructor(private readonly lessonsRepository: LessonsRepository) {}

  async create(createLessonDto: CreateLessonDto) {
    try {
      return await this.lessonsRepository.create(createLessonDto);
    } catch (error) {
      this.logger.error(error);
    }
  }

  findAll() {
    return this.lessonsRepository.find({});
  }

  async findOne(getLessonDto: GetLessonDto) {
    try {
      const lesson = await this.lessonsRepository.findOne({
        _id: getLessonDto.lessonId,
      });

      if (!lesson) {
        throw new NotFoundException('Lesson not found');
      }

      return lesson;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async update({
    lessonId,
    title,
    description,
    videoUrl,
  }: GetLessonDto & UpdateLessonDto) {
    try {
      await this.findOne({ lessonId });

      return await this.lessonsRepository.findOneAndUpdate(
        { _id: lessonId },
        { title, description, videoUrl },
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  remove(getLessonDto: GetLessonDto) {
    try {
      return this.lessonsRepository.findOneAndDelete({
        _id: getLessonDto.lessonId,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  complete(getLessonDto: GetLessonDto) {
    try {
      return this.lessonsRepository.findOneAndUpdate(
        { _id: getLessonDto.lessonId },
        { completed: true },
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
