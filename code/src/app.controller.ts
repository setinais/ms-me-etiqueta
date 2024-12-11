import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('MS-ME')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Retorna uma mensagem de boas-vindas' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de boas-vindas retornada com sucesso.',
    type: String,
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
