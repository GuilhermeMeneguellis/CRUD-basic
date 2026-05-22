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

export class UpdateOrderDto {
  @ApiProperty({ example: 'cus_0001', required: false })
  @IsOptional()
  @IsString()
  customerId?: string;

  @ApiProperty({ example: 'tbl_0003', required: false })
  @IsOptional()
  @IsString()
  tableId?: string;

  @ApiProperty({ type: OrderItemInputDto, isArray: true, required: false })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemInputDto)
  items?: OrderItemInputDto[];

  @ApiProperty({ example: 'Enviar sobremesa depois', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
