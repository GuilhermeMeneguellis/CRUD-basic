import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createId } from '../common/identifiers';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { CustomerDocument, CustomerSchema } from './schemas/customer.schema';

@Injectable()
export class CustomersService implements OnModuleInit {
  constructor(
    @InjectModel(CustomerSchema.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.customerModel.estimatedDocumentCount();

    if (count === 0) {
      await this.customerModel.insertMany([
        {
          id: 'cus_0001',
          name: 'Ana Souza',
          email: 'ana.souza@email.com',
          phone: '+55 11 99999-9999',
          notes: 'Prefere mesa perto da janela',
        },
        {
          id: 'cus_0002',
          name: 'Bruno Lima',
          email: 'bruno.lima@email.com',
          phone: '+55 21 98888-8888',
        },
      ]);
    }
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel
      .find()
      .sort({ createdAt: 1 })
      .exec() as unknown as Customer[];
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel.findOne({ id }).exec();

    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }

    return customer as unknown as Customer;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.customerModel.create({
      id: createId('cus'),
      ...createCustomerDto,
    });
    return customer as unknown as Customer;
  }

  async replace(
    id: string,
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerModel.findOne({ id }).exec();

    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }

    customer.name = createCustomerDto.name;
    customer.email = createCustomerDto.email;
    customer.phone = createCustomerDto.phone;
    customer.notes = createCustomerDto.notes;

    return (await customer.save()) as unknown as Customer;
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerModel
      .findOneAndUpdate({ id }, updateCustomerDto, { new: true })
      .exec();

    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }

    return customer as unknown as Customer;
  }

  async remove(id: string): Promise<void> {
    const result = await this.customerModel.deleteOne({ id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
  }
}
