import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<CustomerSchema>;

@Schema({
  collection: 'customers',
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_document, returnedObject) => {
      delete returnedObject._id;
    },
  },
})
export class CustomerSchema {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ trim: true })
  notes?: string;
}

export const CustomerMongooseSchema =
  SchemaFactory.createForClass(CustomerSchema);
