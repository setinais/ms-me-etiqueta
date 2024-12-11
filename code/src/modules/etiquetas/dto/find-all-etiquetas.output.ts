import { ApiProperty } from '@nestjs/swagger';
import { Etiqueta } from '../entities/etiqueta.entity';
import { MetadataListOutput } from './meta-data.output';

export class FindAllEtiquetasOutput {
  @ApiProperty({ type: [Etiqueta] })
  data: Etiqueta[];
  @ApiProperty({ type: MetadataListOutput })
  metadata: MetadataListOutput;
}
