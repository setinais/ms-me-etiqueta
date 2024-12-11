import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { deleteFile, parseXlsxStream, readFile } from 'src/utils/file-manager';
import { CreateEtiquetaDto } from '../etiquetas/dto/create-etiqueta.dto';
import { EtiquetasService } from '../etiquetas/etiquetas.service';


@Injectable()
export class FilesListener {
  constructor(
    private readonly etiquetasService: EtiquetasService,
  ) { }

  @OnEvent('file.uploaded')
  async processEtiquetas(filePath: string) {
    Logger.log(`Processing etiquetas from file: ${filePath}`);
    try {
      const fileStream = readFile(filePath);
      const worksheet = await parseXlsxStream(fileStream);
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 3) {
          const etiqueta: CreateEtiquetaDto = {
            tag: row.getCell(1).value?.toString() || "",
            name: row.getCell(2).value?.toString() || "",
            status: Number(row.getCell(3).value?.toString()) || 0,
            source: row.getCell(4).value?.toString() || "",
            price: Number(row.getCell(5).value?.toString()) || 0,
          };
          Logger.debug("Row: ", rowNumber, "Etiqueta", etiqueta);
          this.etiquetasService.create(etiqueta);
        } else if (rowNumber === 1) {
          this.etiquetasService.setMetadata({
            name: row.getCell(1).value?.toString() || "",
            description: row.getCell(2).value?.toString() || "",
          });
        }
      });
    } catch (error) {
      Logger.error('Error processing etiquetas', error);
    } finally {
      await deleteFile(filePath);
      Logger.log('Etiquetas processed successfully');
    }
  }
}