import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { TableStatus } from '../enums/table-status.enum';

export class CreateTableDto {
  @ApiProperty({ example: 'Mesa 01' })
  @IsString()
  name: string;

  @ApiProperty({ example: 4, minimum: 1, maximum: 20 })
  @IsInt()
  @Min(1)
  @Max(20)
  seats: number;

  @ApiProperty({ enum: TableStatus, example: TableStatus.Available })
  @IsEnum(TableStatus)
  status: TableStatus;

  @ApiProperty({ example: 'Sala principal', required: false })
  @IsOptional()
  @IsString()
  location?: string;
}
