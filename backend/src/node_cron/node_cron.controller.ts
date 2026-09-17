import { Controller, Get } from '@nestjs/common';
import { NodeCronService } from './node_cron.service';

@Controller('node-cron')
export class NodeCronController {
  constructor(private readonly dailyHomeProducts: NodeCronService) {}

  @Get('home-daily-products')
  getHostsalesProduct() {
    return this.dailyHomeProducts.getHomeProducts();
  }

  
}
