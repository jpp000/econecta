import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class Event extends AbstractDocument {
  @Prop({
    ref: 'User',
    type: Types.ObjectId,
    required: true,
  })
  creator: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  date: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
