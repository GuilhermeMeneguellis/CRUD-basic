import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MenuCategory } from '../enums/menu-category.enum';

export type MenuItemDocument = HydratedDocument<MenuItemSchema>;

@Schema({
  collection: 'menu_items',
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_document, returnedObject) => {
      delete returnedObject._id;
    },
  },
})
export class MenuItemSchema {
  @Prop({ required: true, unique: true, index: true })
  id: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, enum: MenuCategory, index: true })
  category: MenuCategory;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, default: true })
  available: boolean;
}

export const MenuItemMongooseSchema =
  SchemaFactory.createForClass(MenuItemSchema);
