import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsMongoId()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
