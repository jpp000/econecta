import { IsMongoId } from 'class-validator';

export class GetCourseDto {
  @IsMongoId()
  courseId: string;
}
