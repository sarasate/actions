import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // OpenAPI/Swagger config
  const config = new DocumentBuilder()
    .setTitle('Actions')
    .setDescription('Actions API description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('actions')
    .addServer('http://localhost:8080')
    .setExternalDoc('JSON Doc', 'localhost:4040/api-json')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
