import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createId } from '../common/identifiers';
import { CustomersService } from '../customers/customers.service';
import { MenuItemsService } from '../menu-items/menu-items.service';
import { TablesService } from '../tables/tables.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemInputDto } from './dto/order-item-input.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderItem } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { OrderDocument, OrderSchema } from './schemas/order.schema';

@Injectable()
export class OrdersService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(OrderSchema.name)
    private readonly orderModel: Model<OrderDocument>,
    private readonly customersService: CustomersService,
    private readonly tablesService: TablesService,
    private readonly menuItemsService: MenuItemsService,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.orderModel.estimatedDocumentCount();

    if (count === 0) {
      try {
        const normalized = await this.normalizeOrder([
          { menuItemId: 'mit_0005', quantity: 2 },
        ]);

        await this.customersService.findOne('cus_0001');
        await this.tablesService.findOne('tbl_0003');

        await this.orderModel.create({
          id: 'ord_0008',
          customerId: 'cus_0001',
          tableId: 'tbl_0003',
          items: normalized.items,
          status: OrderStatus.Open,
          total: normalized.total,
          notes: 'Pedido inicial para demonstracao',
        });
      } catch {
        return;
      }
    }
  }

  async findAll(status?: OrderStatus, customerId?: string): Promise<Order[]> {
    const filters: Record<string, string> = {};

    if (status) {
      filters.status = status;
    }

    if (customerId) {
      filters.customerId = customerId;
    }

    return this.orderModel
      .find(filters)
      .sort({ createdAt: 1 })
      .exec() as unknown as Order[];
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findOne({ id }).exec();

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    return order as unknown as Order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const normalized = await this.normalizeOrder(createOrderDto.items);

    await this.customersService.findOne(createOrderDto.customerId);
    await this.tablesService.findOne(createOrderDto.tableId);

    const order = await this.orderModel.create({
      id: createId('ord'),
      customerId: createOrderDto.customerId,
      tableId: createOrderDto.tableId,
      items: normalized.items,
      status: OrderStatus.Open,
      total: normalized.total,
      notes: createOrderDto.notes,
    });

    return order as unknown as Order;
  }

  async replace(id: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderModel.findOne({ id }).exec();

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    await this.customersService.findOne(createOrderDto.customerId);
    await this.tablesService.findOne(createOrderDto.tableId);

    const normalized = await this.normalizeOrder(createOrderDto.items);
    order.customerId = createOrderDto.customerId;
    order.tableId = createOrderDto.tableId;
    order.items = normalized.items;
    order.total = normalized.total;
    order.notes = createOrderDto.notes;

    return (await order.save()) as unknown as Order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findOne({ id }).exec();

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    const customerId = updateOrderDto.customerId ?? order.customerId;
    const tableId = updateOrderDto.tableId ?? order.tableId;
    const itemInputs =
      updateOrderDto.items ?? this.toOrderItemInputs(order.items);

    await this.customersService.findOne(customerId);
    await this.tablesService.findOne(tableId);

    const normalized = await this.normalizeOrder(itemInputs);
    order.customerId = customerId;
    order.tableId = tableId;
    order.items = normalized.items;
    order.total = normalized.total;
    order.notes = updateOrderDto.notes ?? order.notes;

    return (await order.save()) as unknown as Order;
  }

  async updateStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.orderModel.findOne({ id }).exec();

    if (!order) {
      throw new NotFoundException(`Order ${id} not found`);
    }

    order.status = updateOrderStatusDto.status;
    return (await order.save()) as unknown as Order;
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderModel.deleteOne({ id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Order ${id} not found`);
    }
  }

  private async normalizeOrder(items: OrderItemInputDto[]): Promise<{
    items: OrderItem[];
    total: number;
  }> {
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const menuItem = await this.menuItemsService.findOne(item.menuItemId);

        if (!menuItem.available) {
          throw new BadRequestException(
            `Menu item ${menuItem.id} is unavailable`,
          );
        }

        const subtotal = this.roundCurrency(menuItem.price * item.quantity);

        return {
          menuItemId: menuItem.id,
          name: menuItem.name,
          quantity: item.quantity,
          unitPrice: menuItem.price,
          subtotal,
          notes: item.notes,
        };
      }),
    );

    const total = this.roundCurrency(
      orderItems.reduce((sum, item) => sum + item.subtotal, 0),
    );

    return { items: orderItems, total };
  }

  private toOrderItemInputs(items: OrderItem[]): OrderItemInputDto[] {
    return items.map((item) => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      notes: item.notes,
    }));
  }

  private roundCurrency(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
