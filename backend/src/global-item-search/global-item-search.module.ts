import { Module } from '@nestjs/common';
import { GlobalItemSearchController } from './global-item-search.controller';
import { GlobalItemSearchService } from './global-item-search.service';

@Module({
  controllers: [GlobalItemSearchController],
  providers: [GlobalItemSearchService]
})
export class GlobalItemSearchModule {}
