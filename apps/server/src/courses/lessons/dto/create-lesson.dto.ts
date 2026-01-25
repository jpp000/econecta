import { IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateLessonDto {
  @IsMongoId()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
  
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  videoUrl: string;
}
