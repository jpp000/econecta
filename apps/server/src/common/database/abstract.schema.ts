import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';

@Schema()
export abstract class AbstractDocument extends Document {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
