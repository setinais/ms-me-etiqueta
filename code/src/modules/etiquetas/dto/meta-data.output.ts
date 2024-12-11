import { PaginationType } from 'src/types/pagination.type';
import { MetadataFile } from '../types/meta-data-file.type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileInfo } from './file-info.entity';
import { Pagination } from './pagination.entity';

export class MetadataOutput {
  @ApiProperty({ type: FileInfo })
  fileInfo: MetadataFile;
}

export class MetadataListOutput extends MetadataOutput {
  @ApiPropertyOptional({ type: Pagination })
  pagination?: PaginationType;
}
