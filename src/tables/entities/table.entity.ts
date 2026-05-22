import { ApiProperty } from '@nestjs/swagger';
import { TableStatus } from '../enums/table-status.enum';

export class RestaurantTable {
  @ApiProperty({ example: 'tbl_0001' })
  id: string;

  @ApiProperty({ example: 'Mesa 01' })
  name: string;

  @ApiProperty({ example: 4 })
  seats: number;

  @ApiProperty({ enum: TableStatus, example: TableStatus.Available })
  status: TableStatus;

  @ApiProperty({ example: 'Sala principal', required: false })
  location?: string;

  @ApiProperty({ example: '2026-05-22T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-05-22T12:00:00.000Z' })
  updatedAt: string;
}
