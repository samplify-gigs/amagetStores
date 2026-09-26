import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'DB/db';
import { CategoryModule } from './category/category.module';
import { GlobalItemSearchModule } from './global-item-search/global-item-search.module';
import { NodeCronModule } from './node_cron/node_cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    DatabaseModule,
    CategoryModule,
    GlobalItemSearchModule,
    NodeCronModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
