import { ApiProperty } from '@nestjs/swagger';
import { ExceptionDefaultType } from 'src/types/exception-default.type';

export class ExceptionDefaultOutput implements ExceptionDefaultType {
  @ApiProperty() statusCode: number;
  @ApiProperty() timestamp: Date;
  @ApiProperty() path: string;
  @ApiProperty() error: string;
  @ApiProperty() message: string;
}
