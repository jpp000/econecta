import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class Lesson extends AbstractDocument {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
