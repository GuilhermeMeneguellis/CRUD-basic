import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemInputDto } from './order-item-input.dto';

export class CreateOrderDto {
  @ApiProperty({ example: 'cus_0001' })
  @IsString()
  customerId: string;

  @ApiProperty({ example: 'tbl_0003' })
  @IsString()
  tableId: string;

  @ApiProperty({ type: OrderItemInputDto, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemInputDto)
  items: OrderItemInputDto[];

  @ApiProperty({ example: 'Cliente pediu entrada primeiro', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
