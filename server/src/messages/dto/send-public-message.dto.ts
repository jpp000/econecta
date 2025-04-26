import { IsNotEmpty, IsString } from 'class-validator';

export class SendPublicMessageDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
