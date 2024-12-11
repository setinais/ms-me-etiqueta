import { ApiProperty } from '@nestjs/swagger';

export class CreateEtiquetaDto {
  @ApiProperty() tag: string;
  @ApiProperty() name: string;
  @ApiProperty() status: number;
  @ApiProperty() source: string;
  @ApiProperty() price: number;
}
