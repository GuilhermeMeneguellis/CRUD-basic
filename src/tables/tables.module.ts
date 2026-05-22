import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TableMongooseSchema, TableSchema } from './schemas/table.schema';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TableSchema.name, schema: TableMongooseSchema },
    ]),
  ],
  controllers: [TablesController],
  providers: [TablesService],
  exports: [TablesService],
})
export class TablesModule {}
