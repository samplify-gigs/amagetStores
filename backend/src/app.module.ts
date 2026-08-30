import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'DB/db';
import { CategoryModule } from './category/category.module';
import { GlobalItemSearchModule } from './global-item-search/global-item-search.module';


@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, CategoryModule, GlobalItemSearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
