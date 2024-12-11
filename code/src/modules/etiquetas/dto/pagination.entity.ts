import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from 'src/types/pagination.type';

export class Pagination implements PaginationType {
  @ApiProperty() page: number;
  @ApiProperty() perPage: number;
  @ApiProperty() total: number;
}
