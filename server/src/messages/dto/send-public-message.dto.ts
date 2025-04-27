import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class SendPublicMessageDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
