import { Controller, Get } from '@nestjs/common';
import { CleantimeService } from './service/cleantime.service';

@Controller('/cleantime')
export class CleanTimeController {
  constructor(private readonly CleantimeService: CleantimeService) {}

  @Get()
  async getCleantime() {
    return this.CleantimeService.getCleantime();
  }
}
