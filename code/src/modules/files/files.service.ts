import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class FilesService {
  constructor(private eventEmitter: EventEmitter2) {}

  async handleFileUpload(filePath: string) {
    this.eventEmitter.emit('file.uploaded', filePath);
    return { message: 'File uploaded successfully' };
  }
}