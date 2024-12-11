import { Test, TestingModule } from '@nestjs/testing';
import { EtiquetasController } from './etiquetas.controller';
import { EtiquetasService } from './etiquetas.service';

describe('EtiquetasController', () => {
  let controller: EtiquetasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtiquetasController],
      providers: [EtiquetasService],
    }).compile();

    controller = module.get<EtiquetasController>(EtiquetasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
