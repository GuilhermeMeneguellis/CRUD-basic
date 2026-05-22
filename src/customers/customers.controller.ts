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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista clientes' })
  @ApiOkResponse({ type: Customer, isArray: true })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um cliente por ID' })
  @ApiParam({ name: 'id', example: 'cus_0001' })
  @ApiOkResponse({ type: Customer })
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um cliente' })
  @ApiCreatedResponse({ type: Customer })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Substitui todos os dados de um cliente' })
  @ApiParam({ name: 'id', example: 'cus_0001' })
  @ApiOkResponse({ type: Customer })
  replace(
    @Param('id') id: string,
    @Body() createCustomerDto: CreateCustomerDto,
  ) {
    return this.customersService.replace(id, createCustomerDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza parcialmente um cliente' })
  @ApiParam({ name: 'id', example: 'cus_0001' })
  @ApiOkResponse({ type: Customer })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove um cliente' })
  @ApiParam({ name: 'id', example: 'cus_0001' })
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    this.customersService.remove(id);
  }
}
