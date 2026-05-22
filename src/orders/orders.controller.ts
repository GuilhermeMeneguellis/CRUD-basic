import {
  Body,
  Controller,
  Delete,
  Get,
  Head,
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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './enums/order-status.enum';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista pedidos' })
  @ApiQuery({ name: 'status', enum: OrderStatus, required: false })
  @ApiQuery({ name: 'customerId', required: false, example: 'cus_0001' })
  @ApiOkResponse({ type: Order, isArray: true })
  findAll(
    @Query('status') status?: OrderStatus,
    @Query('customerId') customerId?: string,
  ) {
    return this.ordersService.findAll(status, customerId);
  }

  @Head(':id')
  @ApiOperation({
    summary: 'Verifica se um pedido existe sem retornar corpo na resposta',
  })
  @ApiParam({ name: 'id', example: 'ord_0008' })
  @ApiOkResponse()
  head(@Param('id') id: string) {
    this.ordersService.findOne(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um pedido por ID' })
  @ApiParam({ name: 'id', example: 'ord_0008' })
  @ApiOkResponse({ type: Order })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um pedido' })
  @ApiCreatedResponse({ type: Order })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Substitui todos os dados de um pedido' })
  @ApiParam({ name: 'id', example: 'ord_0008' })
  @ApiOkResponse({ type: Order })
  replace(@Param('id') id: string, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.replace(id, createOrderDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza parcialmente um pedido' })
  @ApiParam({ name: 'id', example: 'ord_0008' })
  @ApiOkResponse({ type: Order })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Altera apenas o status de um pedido' })
  @ApiParam({ name: 'id', example: 'ord_0008' })
  @ApiOkResponse({ type: Order })
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove um pedido' })
  @ApiParam({ name: 'id', example: 'ord_0008' })
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    this.ordersService.remove(id);
  }
}
