import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class FindMessageDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  messageId: string;
}
