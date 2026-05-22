import { ApiProperty } from '@nestjs/swagger';
import { MenuCategory } from '../enums/menu-category.enum';

export class MenuItem {
  @ApiProperty({ example: 'mit_0001' })
  id: string;

  @ApiProperty({ example: 'Risoto de cogumelos' })
  name: string;

  @ApiProperty({ example: 'Arroz arboreo, mix de cogumelos e parmesao' })
  description: string;

  @ApiProperty({ enum: MenuCategory, example: MenuCategory.Main })
  category: MenuCategory;

  @ApiProperty({ example: 42.9 })
  price: number;

  @ApiProperty({ example: true })
  available: boolean;

  @ApiProperty({ example: '2026-05-22T12:00:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-05-22T12:00:00.000Z' })
  updatedAt: string;
}
