import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';
import { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Message extends AbstractDocument {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  sender: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  receiver: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
