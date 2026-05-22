import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { CustomersModule } from './customers/customers.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { OrdersModule } from './orders/orders.module';
import { RequestLabModule } from './request-lab/request-lab.module';
import { TablesModule } from './tables/tables.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/restaurant-api',
    ),
    CustomersModule,
    TablesModule,
    MenuItemsModule,
    OrdersModule,
    RequestLabModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
