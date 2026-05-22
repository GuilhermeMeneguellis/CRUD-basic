import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TableStatus } from '../enums/table-status.enum';

export type TableDocument = HydratedDocument<TableSchema>;

@Schema({
  collection: 'tables',
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_document, returnedObject) => {
      delete returnedObject._id;
    },
  },
})
export class TableSchema {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, min: 1, max: 20 })
  seats: number;

  @Prop({ required: true, enum: TableStatus })
  status: TableStatus;

  @Prop({ trim: true })
  location?: string;
}

export const TableMongooseSchema = SchemaFactory.createForClass(TableSchema);
