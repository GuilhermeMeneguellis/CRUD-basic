import { Module } from '@nestjs/common';
import { RequestLabController } from './request-lab.controller';

@Module({
  controllers: [RequestLabController],
})
export class RequestLabModule {}
