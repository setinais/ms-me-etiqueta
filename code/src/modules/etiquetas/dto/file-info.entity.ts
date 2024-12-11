import { ApiProperty } from '@nestjs/swagger';
import { MetadataFile } from '../types/meta-data-file.type';

export class FileInfo implements MetadataFile {
  @ApiProperty() description: string;
  @ApiProperty() name: string;
}
