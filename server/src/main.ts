import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Bootstraps the application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(3000);
  console.info("Server is running at port 3000");
}
bootstrap();
