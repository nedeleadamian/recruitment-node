import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';
import { SeedDto } from './dto/seed.dto';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  public async seed(@Body() body: SeedDto): Promise<void> {
    return this.seedService.seed(body);
  }
}
