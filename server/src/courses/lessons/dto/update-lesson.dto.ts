import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateLessonDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
  
  @IsString()
  @IsOptional()
  @IsUrl()
  videoUrl?: string;
}
