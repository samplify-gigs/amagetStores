import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const originURL = config.get<string>('BASE_URL');

  app.enableCors({
    origin: `${originURL}`,
  });
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
