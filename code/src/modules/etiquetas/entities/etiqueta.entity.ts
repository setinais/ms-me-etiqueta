import { ApiProperty } from '@nestjs/swagger';
import { EtiquetaType } from '../types/etiqueta.type';

export class Etiqueta implements EtiquetaType {
  @ApiProperty() tag: string;
  @ApiProperty() name: string;
  @ApiProperty() status: number;
  @ApiProperty() source: string;
  @ApiProperty() price: number;
}
