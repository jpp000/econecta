import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GetPrivateChatMessagesDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  receiverId: string;
}
