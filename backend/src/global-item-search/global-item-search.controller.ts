import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { GlobalItemSearchService } from './global-item-search.service';
import { SearchItemsDto } from 'src/DTOs/search/global-search.dto';

@Controller('global-item-search')
export class GlobalItemSearchController {
  constructor(
    private readonly globalsearchItemsService: GlobalItemSearchService,
  ) {}

  @Post('search-products')
  getSearch(@Body(new ValidationPipe()) body: SearchItemsDto) {
    return this.globalsearchItemsService.searchDb(body);
  }
}
