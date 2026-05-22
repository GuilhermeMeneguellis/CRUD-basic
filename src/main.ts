import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ preflightContinue: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Restaurant API')
    .setDescription('API REST didatica para testar metodos HTTP em Nest.js.')
    .setVersion('1.0')
    .addTag('request-lab', 'Endpoints para demonstrar metodos HTTP.')
    .addTag('customers', 'Cadastro de clientes.')
    .addTag('tables', 'Cadastro de mesas.')
    .addTag('menu-items', 'Itens do cardapio.')
    .addTag('orders', 'Pedidos do restaurante.')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}

bootstrap();
