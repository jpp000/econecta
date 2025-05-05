import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { GetCourseDto } from './dto/get-course.dto';
import { CoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  private readonly logger: Logger = new Logger(CoursesService.name);

  constructor(private readonly coursesRepository: CoursesRepository) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const courseExists = await this.coursesRepository.findOne({
        title: createCourseDto.title,
      });

      if (courseExists) {
        throw new ConflictException('Course already exists');
      }

      return this.coursesRepository.create(createCourseDto);
    } catch (error) {
      this.logger.error(error);
    }
  }

  findAll() {
    return this.coursesRepository.find({});
  }

  async findOne({ courseId }: GetCourseDto) {
    const course = await this.coursesRepository.findOne({ _id: courseId });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update({
    courseId,
    title,
    description,
  }: GetCourseDto & UpdateCourseDto) {
    try {
      await this.findOne({ courseId });

      return await this.coursesRepository.findOneAndUpdate(
        { _id: courseId },
        { title, description },
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  async remove({ courseId }: GetCourseDto) {
    try {
      await this.findOne({ courseId });

      return await this.coursesRepository.findOneAndDelete({ _id: courseId });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
