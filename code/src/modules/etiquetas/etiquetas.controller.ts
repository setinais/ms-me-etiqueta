import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UpdateEtiquetaDto } from './dto/update-etiqueta.dto';
import { EtiquetasService } from './etiquetas.service';
import { FindAllEtiquetasOutput } from './dto/find-all-etiquetas.output';
import { FindAllEtiquetasInput } from './dto/find-all-etiquetas.input';
import { FindOneEtiquetaOutput } from './dto/find-one-etiqueta.output';
import { FilterSortEnum } from './enums/filter-sort.enum';
import { FilterOrderEnum } from './enums/filter-order.enum';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionDefaultOutput } from 'src/dto/exception-default.output';

@ApiTags('Etiquetas')
@Controller('etiquetas')
export class EtiquetasController {
  constructor(private readonly etiquetasService: EtiquetasService) {}

  @ApiOperation({ summary: 'Listar Etiquetas' })
  @ApiQuery({ name: 'sort', default: FilterSortEnum.TAG, required: false })
  @ApiQuery({ name: 'order', default: FilterOrderEnum.ASC, required: false })
  @ApiQuery({ name: 'page', default: 1, required: false })
  @ApiQuery({ name: 'perPage', default: 10, required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiResponse({
    status: 200,
    description: 'Lista de Etiquetas',
    type: FindAllEtiquetasOutput,
  })
  @ApiResponse({
    status: 500,
    type: ExceptionDefaultOutput,
    description: 'Erro interno',
  })
  @Get()
  findAll(
    @Query() findAllEtiquetasInput?: FindAllEtiquetasInput,
  ): FindAllEtiquetasOutput {
    const filters: FindAllEtiquetasInput = {
      sort: findAllEtiquetasInput?.sort || FilterSortEnum.TAG,
      order: findAllEtiquetasInput?.order || FilterOrderEnum.ASC,
      page: findAllEtiquetasInput?.page || 1,
      perPage: findAllEtiquetasInput?.perPage || 10,
      search: findAllEtiquetasInput?.search || undefined,
      status: findAllEtiquetasInput?.status || undefined,
    };
    return this.etiquetasService.findAll(filters);
  }

  @ApiOperation({ summary: 'Buscar Etiqueta' })
  @ApiParam({ name: 'tag' })
  @ApiResponse({ status: 200, type: FindOneEtiquetaOutput })
  @ApiResponse({
    status: 404,
    type: ExceptionDefaultOutput,
    description: 'Etiqueta não encontrada',
  })
  @ApiResponse({
    status: 500,
    type: ExceptionDefaultOutput,
    description: 'Erro interno',
  })
  @Get(':tag')
  findOne(@Param('tag') tag: string): FindOneEtiquetaOutput {
    return this.etiquetasService.findOne(tag);
  }

  @ApiOperation({ summary: 'Atualizar Etiqueta' })
  @ApiParam({ name: 'tag' })
  @ApiResponse({ status: 200, type: FindOneEtiquetaOutput })
  @ApiResponse({
    status: 404,
    type: ExceptionDefaultOutput,
    description: 'Etiqueta não encontrada',
  })
  @ApiResponse({
    status: 500,
    type: ExceptionDefaultOutput,
    description: 'Erro interno',
  })
  @Patch(':tag')
  update(
    @Param('tag') tag: string,
    @Body() updateEtiquetaDto: UpdateEtiquetaDto,
  ): FindOneEtiquetaOutput {
    return this.etiquetasService.update(tag, updateEtiquetaDto);
  }

  @ApiOperation({ summary: 'Remover Etiqueta' })
  @ApiParam({ name: 'tag' })
  @ApiResponse({ status: 200, type: FindOneEtiquetaOutput })
  @ApiResponse({
    status: 404,
    type: ExceptionDefaultOutput,
    description: 'Etiqueta não encontrada',
  })
  @ApiResponse({
    status: 500,
    type: ExceptionDefaultOutput,
    description: 'Erro interno',
  })
  @Delete(':tag')
  remove(@Param('tag') tag: string): void {
    return this.etiquetasService.remove(tag);
  }
}
