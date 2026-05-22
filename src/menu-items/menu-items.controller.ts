import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItem } from './entities/menu-item.entity';
import { MenuCategory } from './enums/menu-category.enum';
import { MenuItemsService } from './menu-items.service';

@ApiTags('menu-items')
@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista itens do cardapio' })
  @ApiQuery({ name: 'category', enum: MenuCategory, required: false })
  @ApiOkResponse({ type: MenuItem, isArray: true })
  findAll(@Query('category') category?: MenuCategory) {
    return this.menuItemsService.findAll(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um item do cardapio por ID' })
  @ApiParam({ name: 'id', example: 'mit_0005' })
  @ApiOkResponse({ type: MenuItem })
  findOne(@Param('id') id: string) {
    return this.menuItemsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um item do cardapio' })
  @ApiCreatedResponse({ type: MenuItem })
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Substitui todos os dados de um item do cardapio' })
  @ApiParam({ name: 'id', example: 'mit_0005' })
  @ApiOkResponse({ type: MenuItem })
  replace(
    @Param('id') id: string,
    @Body() createMenuItemDto: CreateMenuItemDto,
  ) {
    return this.menuItemsService.replace(id, createMenuItemDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza parcialmente um item do cardapio' })
  @ApiParam({ name: 'id', example: 'mit_0005' })
  @ApiOkResponse({ type: MenuItem })
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemsService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove um item do cardapio' })
  @ApiParam({ name: 'id', example: 'mit_0005' })
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    this.menuItemsService.remove(id);
  }
}
