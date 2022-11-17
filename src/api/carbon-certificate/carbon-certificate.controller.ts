import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AbstractPaginationDto } from '@abstraction/dto/abstract-pagination.dto';
import { AUTH_GUARD, AuthUser, IAuthUser } from '@core/auth';
import { CarbonCertificateService } from './carbon-certificate.service';
import { CarbonCertificateResultDto } from './dto/carbon-certificate-result.dto';

@ApiBearerAuth()
@UseGuards(AUTH_GUARD)
@ApiTags('carbon-certificate')
@Controller('carbon-certificate')
export class CarbonCertificateController {
  constructor(
    private readonly carbonCertificateService: CarbonCertificateService,
  ) {}

  @Get()
  @ApiResponse({ type: CarbonCertificateResultDto, isArray: false })
  public async certificates(
    @Query() query: AbstractPaginationDto,
  ): Promise<CarbonCertificateResultDto> {
    return this.carbonCertificateService.findCarbonCertificates(query);
  }

  @Get('/personal')
  @ApiResponse({ type: CarbonCertificateResultDto, isArray: false })
  public async myCertificates(
    @Query() query: AbstractPaginationDto,
    @AuthUser() authUser: IAuthUser,
  ): Promise<CarbonCertificateResultDto> {
    return this.carbonCertificateService.findCarbonCertificates(
      query,
      authUser.id,
    );
  }

  @Post('/:certificateId/transfer/:targetUserId')
  @ApiResponse({ type: Boolean, isArray: false })
  public async transferCertificate(
    @Param('targetUserId', new ParseIntPipe()) targetUserId: number,
    @Param('certificateId', new ParseIntPipe()) certificateId: number,
    @AuthUser() authUser: IAuthUser,
  ): Promise<boolean> {
    return this.carbonCertificateService.transferCertificate(
      authUser,
      certificateId,
      targetUserId,
    );
  }
}
