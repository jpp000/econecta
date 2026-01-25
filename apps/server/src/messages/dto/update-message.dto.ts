import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  messageId: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
