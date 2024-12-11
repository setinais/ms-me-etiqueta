import { ApiProperty } from '@nestjs/swagger';
import { Etiqueta } from '../entities/etiqueta.entity';
import { MetadataOutput } from './meta-data.output';

export class FindOneEtiquetaOutput {
  @ApiProperty({ type: Etiqueta })
  data: Etiqueta;

  @ApiProperty({ type: MetadataOutput })
  metadata: MetadataOutput;
}
