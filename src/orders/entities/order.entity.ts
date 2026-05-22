import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order-status.enum';

export class OrderItem {
  @ApiProperty({ example: 'mit_0005' })
  menuItemId: string;

  @ApiProperty({ example: 'Risoto de cogumelos' })
  name: string;

  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 42.9 })
  unitPrice: number;

  @ApiProperty({ example: 85.8 })
  subtotal: number;

  @ApiProperty({ example: 'Sem queijo', required: false })
  notes?: string;
}

export class Order {
  @ApiProperty({ example: 'ord_0008' })
  id: string;

  @ApiProperty({ example: 'cus_0001' })
  customerId: string;

  @ApiProperty({ example: 'tbl_0003' })
  tableId: string;

  @ApiProperty({ type: OrderItem, isArray: true })
  items: OrderItem[];

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.Open })
  status: OrderStatus;

  @ApiProperty({ example: 85.8 })
  total: number;

  @ApiProperty({ example: 'Enviar sobremesa depois', required: false })
  notes?: string;

  @ApiProperty({ example: '2026-05-22T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-05-22T12:00:00.000Z' })
  updatedAt: string;
}
