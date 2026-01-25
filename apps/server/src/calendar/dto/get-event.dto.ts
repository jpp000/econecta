import { IsMongoId, IsString } from 'class-validator';

export class GetEventDto {
  @IsString()
  @IsMongoId()
  _id: string;
}
