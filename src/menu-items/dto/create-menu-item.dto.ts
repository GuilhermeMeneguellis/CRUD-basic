import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { MenuCategory } from '../enums/menu-category.enum';

export class CreateMenuItemDto {
  @ApiProperty({ example: 'Risoto de cogumelos' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Arroz arboreo, mix de cogumelos e parmesao' })
  @IsString()
  description: string;

  @ApiProperty({ enum: MenuCategory, example: MenuCategory.Main })
  @IsEnum(MenuCategory)
  category: MenuCategory;

  @ApiProperty({ example: 42.9, minimum: 0 })
  @IsNumber()
  @Min(0)
  @Max(9999)
  price: number;

  @ApiProperty({ example: true, required: false, default: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean;
}
