import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesListener } from './files.listener';
import { EtiquetasModule } from '../etiquetas/etiquetas.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService, FilesListener],
  imports: [EtiquetasModule]
})
export class FilesModule { }
