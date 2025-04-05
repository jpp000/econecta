import { AbstractDocument } from 'src/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class User extends AbstractDocument {
  @Prop({ unique: true })
  username: string;

  @Prop()
  phone?: string;

  @Prop()
  avatar?: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
