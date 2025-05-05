import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/common/database/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class Course extends AbstractDocument {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
