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
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { RestaurantTable } from './entities/table.entity';
import { TablesService } from './tables.service';

@ApiTags('tables')
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  @ApiOperation({ summary: 'Lista mesas' })
  @ApiOkResponse({ type: RestaurantTable, isArray: true })
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma mesa por ID' })
  @ApiParam({ name: 'id', example: 'tbl_0003' })
  @ApiOkResponse({ type: RestaurantTable })
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma mesa' })
  @ApiCreatedResponse({ type: RestaurantTable })
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Substitui todos os dados de uma mesa' })
  @ApiParam({ name: 'id', example: 'tbl_0003' })
  @ApiOkResponse({ type: RestaurantTable })
  replace(@Param('id') id: string, @Body() createTableDto: CreateTableDto) {
    return this.tablesService.replace(id, createTableDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza parcialmente uma mesa' })
  @ApiParam({ name: 'id', example: 'tbl_0003' })
  @ApiOkResponse({ type: RestaurantTable })
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(id, updateTableDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove uma mesa' })
  @ApiParam({ name: 'id', example: 'tbl_0003' })
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    this.tablesService.remove(id);
  }
}
