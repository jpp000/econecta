import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { GetLessonDto } from './dto/get-lesson.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':lessonId')
  findOne(@Param() getLessonDto: GetLessonDto) {
    return this.lessonsService.findOne(getLessonDto);
  }

  @Put(':lessonId')
  update(
    @Param() getLessonDto: GetLessonDto,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update({
      lessonId: getLessonDto.lessonId,
      ...updateLessonDto,
    });
  }

  @Put(':lessonId/complete')
  complete(@Param() getLessonDto: GetLessonDto) {
    return this.lessonsService.complete(getLessonDto);
  }

  @Delete(':lessonId')
  remove(@Param() getLessonDto: GetLessonDto) {
    return this.lessonsService.remove(getLessonDto);
  }
}
