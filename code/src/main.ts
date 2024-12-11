import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { textSync } from 'figlet';
import { ExceptionFilter } from './filters/ExceptionFilter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function swaggerConfig() {
  const config = new DocumentBuilder()
    .setTitle('MS-ME Etiqueta')
    .setDescription('Micro-serviço MaisEnvios para CRUD Etiqueta')
    .setVersion('1.0')
    .build();
  return config;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionFilter());
  app.enableShutdownHooks();

  if (process.env.SWAGGER_ENABLED === 'true') {
    const document = SwaggerModule.createDocument(app, swaggerConfig());
    SwaggerModule.setup(process.env.SWAGGER_PATH || 'api', app, document);
  }

  await app.listen(process.env.API_PORT ?? 3000, () => {
    console.log(`${textSync(process.env.API_NAME as string, 'Standard')}`);
    Logger.verbose(`Server running on ${process.env.API_PORT}`);
  });
}
bootstrap();
