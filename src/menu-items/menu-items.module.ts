import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuItemsController } from './menu-items.controller';
import { MenuItemsService } from './menu-items.service';
import {
  MenuItemMongooseSchema,
  MenuItemSchema,
} from './schemas/menu-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItemSchema.name, schema: MenuItemMongooseSchema },
    ]),
  ],
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
  exports: [MenuItemsService],
})
export class MenuItemsModule {}
