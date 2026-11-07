import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = app.get(ConfigService);
  const originURL = config.get<string>('BASE_URL');

  app.enableCors({
    origin: `${originURL}`,
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
