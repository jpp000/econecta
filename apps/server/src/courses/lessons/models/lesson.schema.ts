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

  @Prop({ required: true })
  videoUrl: string;

  @Prop({ default: false })
  completed: boolean;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
