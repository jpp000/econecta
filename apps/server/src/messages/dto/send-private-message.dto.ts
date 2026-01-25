import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class SendPrivateMessageDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  receiverId: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
