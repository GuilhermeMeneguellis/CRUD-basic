import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Verifica se a API esta online' })
  getHealth() {
    return {
      name: 'Restaurant API',
      status: 'online',
      docs: '/docs',
      resources: ['customers', 'tables', 'menu-items', 'orders', 'request-lab'],
    };
  }
}
