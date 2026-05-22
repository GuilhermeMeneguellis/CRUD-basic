import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createId } from '../common/identifiers';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItem } from './entities/menu-item.entity';
import { MenuCategory } from './enums/menu-category.enum';
import { MenuItemDocument, MenuItemSchema } from './schemas/menu-item.schema';

@Injectable()
export class MenuItemsService implements OnModuleInit {
  constructor(
    @InjectModel(MenuItemSchema.name)
    private readonly menuItemModel: Model<MenuItemDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.menuItemModel.estimatedDocumentCount();

    if (count === 0) {
      await this.menuItemModel.insertMany([
        {
          id: 'mit_0005',
          name: 'Bruschetta',
          description: 'Pao italiano, tomate, manjericao e azeite',
          category: MenuCategory.Starter,
          price: 24.9,
          available: true,
        },
        {
          id: 'mit_0006',
          name: 'Risoto de cogumelos',
          description: 'Arroz arboreo, mix de cogumelos e parmesao',
          category: MenuCategory.Main,
          price: 42.9,
          available: true,
        },
        {
          id: 'mit_0007',
          name: 'Tiramisu',
          description: 'Sobremesa italiana com cafe e mascarpone',
          category: MenuCategory.Dessert,
          price: 26.5,
          available: true,
        },
      ]);
    }
  }

  async findAll(category?: MenuCategory): Promise<MenuItem[]> {
    const filters = category ? { category } : {};
    return this.menuItemModel
      .find(filters)
      .sort({ createdAt: 1 })
      .exec() as unknown as MenuItem[];
  }

  async findOne(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemModel.findOne({ id }).exec();

    if (!menuItem) {
      throw new NotFoundException(`Menu item ${id} not found`);
    }

    return menuItem as unknown as MenuItem;
  }

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const menuItem = await this.menuItemModel.create({
      id: createId('mit'),
      available: true,
      ...createMenuItemDto,
    });
    return menuItem as unknown as MenuItem;
  }

  async replace(
    id: string,
    createMenuItemDto: CreateMenuItemDto,
  ): Promise<MenuItem> {
    const menuItem = await this.menuItemModel.findOne({ id }).exec();

    if (!menuItem) {
      throw new NotFoundException(`Menu item ${id} not found`);
    }

    menuItem.name = createMenuItemDto.name;
    menuItem.description = createMenuItemDto.description;
    menuItem.category = createMenuItemDto.category;
    menuItem.price = createMenuItemDto.price;
    menuItem.available = createMenuItemDto.available ?? true;

    return (await menuItem.save()) as unknown as MenuItem;
  }

  async update(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    const menuItem = await this.menuItemModel
      .findOneAndUpdate({ id }, updateMenuItemDto, { new: true })
      .exec();

    if (!menuItem) {
      throw new NotFoundException(`Menu item ${id} not found`);
    }

    return menuItem as unknown as MenuItem;
  }

  async remove(id: string): Promise<void> {
    const result = await this.menuItemModel.deleteOne({ id }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Menu item ${id} not found`);
    }
  }
}
