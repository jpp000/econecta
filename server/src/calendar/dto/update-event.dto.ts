import { IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  date?: Date;
}
