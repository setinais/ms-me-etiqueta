import { Test, TestingModule } from '@nestjs/testing';
import { EtiquetasService } from './etiquetas.service';

describe('EtiquetasService', () => {
  let service: EtiquetasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtiquetasService],
    }).compile();

    service = module.get<EtiquetasService>(EtiquetasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
