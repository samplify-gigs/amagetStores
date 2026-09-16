import { Module } from '@nestjs/common';
import { NodeCronController } from './node_cron.controller';
import { NodeCronService } from './node_cron.service';

@Module({
  controllers: [NodeCronController],
  providers: [NodeCronService]
})
export class NodeCronModule {}
