import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  receiverId: string;
}
