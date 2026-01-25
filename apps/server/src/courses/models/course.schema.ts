import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';
import { Lesson } from '../lessons/models/lesson.schema';

@Schema({ versionKey: false, timestamps: true })
export class Course extends AbstractDocument {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Lesson' }] })
  lessons: Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
