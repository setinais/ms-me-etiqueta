import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionDefaultOutput } from 'src/dto/exception-default.output';

const SIZE_MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload-etiqueta')
  @ApiOperation({ summary: 'Upload de arquivo de etiquetas' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Arquivo de etiquetas para upload',
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Arquivo enviado com sucesso.' })
  @ApiResponse({
    status: 400,
    type: ExceptionDefaultOutput,
    description: 'Arquivo inválido.',
  })
  @ApiResponse({
    status: 500,
    type: ExceptionDefaultOutput,
    description: 'Erro interno',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize:
              Number(process.env.SIZE_MAX_FILE_BYTES) || SIZE_MAX_FILE_BYTES,
          }),
          new FileTypeValidator({
            fileType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return await this.filesService.handleFileUpload(file.path);
  }
}
