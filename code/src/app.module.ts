import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EtiquetasModule } from './modules/etiquetas/etiquetas.module';
import { FilesModule } from './modules/files/files.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EtiquetasModule, FilesModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
