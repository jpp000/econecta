import { IsMongoId } from 'class-validator';

export class GetLessonDto {
  @IsMongoId()
  lessonId: string;
}
