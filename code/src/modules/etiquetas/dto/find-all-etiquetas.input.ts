import { ApiPropertyOptional } from '@nestjs/swagger';
import { FilterOrderEnum } from '../enums/filter-order.enum';
import { FilterSortEnum } from '../enums/filter-sort.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllEtiquetasInput {
  @ApiPropertyOptional({ enum: FilterSortEnum })
  @IsOptional()
  @IsEnum(FilterSortEnum)
  sort?: FilterSortEnum;

  @ApiPropertyOptional({ enum: FilterOrderEnum })
  @IsOptional()
  @IsEnum(FilterOrderEnum)
  order?: FilterOrderEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  perPage?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  status?: number;
}
