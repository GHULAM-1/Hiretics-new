import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(3002);
  console.log('🚀 PDF Ranking Service running at http://localhost:3002');
}

bootstrap().catch((error) => {
  console.error('Error starting application:', error);
  process.exit(1);
});
