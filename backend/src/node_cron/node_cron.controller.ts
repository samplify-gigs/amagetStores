import { Controller, Get } from '@nestjs/common';
import { NodeCronService } from './node_cron.service';

@Controller('node-cron')
export class NodeCronController {
  constructor(private readonly hotSalesProducts: NodeCronService) {
   
  }

  @Get()
  getHostsalesProduct() {
    return this.hotSalesProducts.getHotSalesLiveProducts();
  }
}
