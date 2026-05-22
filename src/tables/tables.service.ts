import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createId } from '../common/identifiers';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { RestaurantTable } from './entities/table.entity';
import { TableStatus } from './enums/table-status.enum';
import { TableDocument, TableSchema } from './schemas/table.schema';

@Injectable()
export class TablesService implements OnModuleInit {
  constructor(
    @InjectModel(TableSchema.name)
    private readonly tableModel: Model<TableDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.tableModel.estimatedDocumentCount();

    if (count === 0) {
      await this.tableModel.insertMany([
        {
          id: 'tbl_0003',
          name: 'Mesa 01',
          seats: 2,
          status: TableStatus.Available,
          location: 'Sala principal',
        },
        {
          id: 'tbl_0004',
          name: 'Mesa 02',
          seats: 4,
          status: TableStatus.Reserved,
          location: 'Varanda',
        },
      ]);
    }
  }

  async findAll(): Promise<RestaurantTable[]> {
    return this.tableModel
      .find()
      .sort({ createdAt: 1 })
      .exec() as unknown as RestaurantTable[];
  }

  async findOne(id: string): Promise<RestaurantTable> {
    const table = await this.tableModel.findOne({ id }).exec();

    if (!table) {
      throw new NotFoundException(`Table ${id} not found`);
    }

    return table as unknown as RestaurantTable;
  }

  async create(createTableDto: CreateTableDto): Promise<RestaurantTable> {
    const table = await this.tableModel.create({
      id: createId('tbl'),
      ...createTableDto,
    });
    return table as unknown as RestaurantTable;
  }

  async replace(
    id: string,
    createTableDto: CreateTableDto,
  ): Promise<RestaurantTable> {
    const table = await this.tableModel.findOne({ id }).exec();

    if (!table) {
      throw new NotFoundException(`Table ${id} not found`);
    }

    table.name = createTableDto.name;
    table.seats = createTableDto.seats;
    table.status = createTableDto.status;
    table.location = createTableDto.location;

    return (await table.save()) as unknown as RestaurantTable;
  }

  async update(
    id: string,
    updateTableDto: UpdateTableDto,
  ): Promise<RestaurantTable> {
    const table = await this.tableModel
      .findOneAndUpdate({ id }, updateTableDto, { new: true })
      .exec();

    if (!table) {
      throw new NotFoundException(`Table ${id} not found`);
    }

    return table as unknown as RestaurantTable;
  }

  async remove(id: string): Promise<void> {
    const result = await this.tableModel.deleteOne({ id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Table ${id} not found`);
    }
  }
}
