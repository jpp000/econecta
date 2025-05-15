import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { GetCourseDto } from './dto/get-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':courseId')
  findOne(@Param() getCourseDto: GetCourseDto) {
    return this.coursesService.findOne(getCourseDto);
  }

  @Put(':courseId')
  update(
    @Param() getCourseDto: GetCourseDto,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    console.log({ getCourseDto, updateCourseDto });
    

    return this.coursesService.update({
      courseId: getCourseDto.courseId,
      ...updateCourseDto,
    });
  }

  @Delete(':courseId')
  remove(@Param() getCourseDto: GetCourseDto) {
    return this.coursesService.remove(getCourseDto);
  }
}
