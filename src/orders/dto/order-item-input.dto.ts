import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class OrderItemInputDto {
  @ApiProperty({ example: 'mit_0005' })
  @IsString()
  menuItemId: string;

  @ApiProperty({ example: 2, minimum: 1, maximum: 99 })
  @IsInt()
  @Min(1)
  @Max(99)
  quantity: number;

  @ApiProperty({ example: 'Sem queijo', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
