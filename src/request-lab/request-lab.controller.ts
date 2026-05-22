import {
  All,
  Body,
  Controller,
  Delete,
  Get,
  Head,
  Header,
  HttpCode,
  Options,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('request-lab')
@Controller('request-lab')
export class RequestLabController {
  @Get()
  @ApiOperation({ summary: 'Testa o metodo GET' })
  @ApiOkResponse({
    schema: {
      example: {
        method: 'GET',
        message: 'GET usado para buscar dados sem alterar o servidor.',
      },
    },
  })
  get() {
    return {
      method: 'GET',
      message: 'GET usado para buscar dados sem alterar o servidor.',
      queryExample: '/request-lab?search=mesa',
    };
  }

  @Post()
  @ApiOperation({ summary: 'Testa o metodo POST' })
  @ApiBody({
    schema: {
      example: {
        name: 'Nova acao',
        description: 'POST normalmente cria um recurso.',
      },
    },
  })
  post(@Body() body: Record<string, unknown>) {
    return {
      method: 'POST',
      message: 'POST normalmente cria um recurso.',
      bodyReceived: body,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Testa o metodo PUT' })
  @ApiParam({ name: 'id', example: 'abc123' })
  @ApiBody({
    schema: {
      example: {
        name: 'Registro completo',
        active: true,
      },
    },
  })
  put(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return {
      method: 'PUT',
      id,
      message: 'PUT normalmente substitui o recurso inteiro.',
      bodyReceived: body,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Testa o metodo PATCH' })
  @ApiParam({ name: 'id', example: 'abc123' })
  @ApiBody({
    schema: {
      example: {
        active: false,
      },
    },
  })
  patch(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return {
      method: 'PATCH',
      id,
      message: 'PATCH normalmente altera apenas alguns campos.',
      bodyReceived: body,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Testa o metodo DELETE com corpo de resposta' })
  @ApiParam({ name: 'id', example: 'abc123' })
  delete(@Param('id') id: string) {
    return {
      method: 'DELETE',
      id,
      message: 'DELETE normalmente remove um recurso.',
    };
  }

  @Head('ping')
  @HttpCode(204)
  @ApiOperation({ summary: 'Testa o metodo HEAD sem corpo de resposta' })
  @ApiNoContentResponse()
  head() {
    return;
  }

  @Options('methods')
  @Header('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS')
  @ApiOperation({ summary: 'Testa o metodo OPTIONS e mostra metodos aceitos' })
  @ApiOkResponse({
    schema: {
      example: {
        method: 'OPTIONS',
        allow: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      },
    },
  })
  options() {
    return {
      method: 'OPTIONS',
      allow: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    };
  }

  @All('echo')
  @ApiOperation({
    summary: 'Recebe qualquer metodo HTTP e devolve dados da requisicao',
  })
  @ApiBody({
    required: false,
    schema: {
      example: {
        any: 'value',
      },
    },
  })
  echo(@Req() request: Request, @Body() body: Record<string, unknown>) {
    return {
      method: request.method,
      path: request.path,
      query: request.query,
      bodyReceived: body ?? null,
    };
  }
}
