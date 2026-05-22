import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';

export type OrderDocument = HydratedDocument<OrderSchema>;

@Schema({ _id: false })
export class OrderItemSchema {
  @Prop({ required: true })
  menuItemId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  unitPrice: number;

  @Prop({ required: true, min: 0 })
  subtotal: number;

  @Prop()
  notes?: string;
}

const OrderItemMongooseSchema = SchemaFactory.createForClass(OrderItemSchema);

@Schema({
  collection: 'orders',
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_document, returnedObject) => {
      delete returnedObject._id;
    },
  },
})
export class OrderSchema {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true, index: true })
  customerId: string;

  @Prop({ required: true, index: true })
  tableId: string;

  @Prop({ required: true, type: [OrderItemMongooseSchema] })
  items: OrderItemSchema[];

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.Open })
  status: OrderStatus;

  @Prop({ required: true, min: 0 })
  total: number;

  @Prop()
  notes?: string;
}

export const OrderMongooseSchema = SchemaFactory.createForClass(OrderSchema);
