import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from '../customers/customers.module';
import { MenuItemsModule } from '../menu-items/menu-items.module';
import { TablesModule } from '../tables/tables.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderMongooseSchema, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    CustomersModule,
    TablesModule,
    MenuItemsModule,
    MongooseModule.forFeature([
      { name: OrderSchema.name, schema: OrderMongooseSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
