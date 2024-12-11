import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationType } from 'src/types/pagination.type';
import { CreateEtiquetaDto } from './dto/create-etiqueta.dto';
import { FindAllEtiquetasInput } from './dto/find-all-etiquetas.input';
import { FindAllEtiquetasOutput } from './dto/find-all-etiquetas.output';
import { FindOneEtiquetaOutput } from './dto/find-one-etiqueta.output';
import { UpdateEtiquetaDto } from './dto/update-etiqueta.dto';
import { FilterOrderEnum } from './enums/filter-order.enum';
import { EtiquetaType } from './types/etiqueta.type';
import { MetadataFile } from './types/meta-data-file.type';

@Injectable()
export class EtiquetasService {
  private etiquetas: EtiquetaType[] = [];
  private metadata: MetadataFile = {
    description: '',
    name: '',
  };

  findAll(filters: FindAllEtiquetasInput): FindAllEtiquetasOutput {
    const { sort, order, page, perPage, search, status } = filters;

    let data: EtiquetaType[] = this.etiquetas;

    if (search) {
      const lowerCaseSearch = search.toLocaleLowerCase();
      data = data.filter((etiqueta) =>
        etiqueta.name.toLocaleLowerCase().includes(lowerCaseSearch),
      );
    }

    if (status !== undefined) {
      data = data.filter((etiqueta) => etiqueta.status === status);
    }

    if (sort && order) {
      data = data.sort((a, b) => {
        if (a[sort] < b[sort]) return order === FilterOrderEnum.ASC ? -1 : 1;
        if (a[sort] > b[sort]) return order === FilterOrderEnum.ASC ? 1 : -1;
        return 0;
      });
    }

    const start = ((page as number) - 1) * (perPage as number);
    const end = start + (perPage as number);
    const paginatedData = data.slice(start, end);

    const pagination: PaginationType = {
      page: Number(page),
      perPage: Number(perPage),
      total: data.length,
    };

    return {
      data: paginatedData,
      metadata: { fileInfo: this.metadata, pagination },
    };
  }

  findOne(tag: string): FindOneEtiquetaOutput {
    const etiqueta = this.etiquetas.find((etiqueta) => etiqueta.tag === tag);
    if (!etiqueta) {
      throw new NotFoundException(`Etiqueta with tag ${tag} not found`);
    }
    return { data: etiqueta, metadata: { fileInfo: this.metadata } };
  }

  create(etiqueta: CreateEtiquetaDto): EtiquetaType {
    this.etiquetas.push({ ...etiqueta });
    return etiqueta;
  }

  update(
    tag: string,
    updateEtiqueDto: UpdateEtiquetaDto,
  ): FindOneEtiquetaOutput {
    const findEtiqueta = this.findOne(tag);
    if (!findEtiqueta) {
      throw new NotFoundException(`Etiqueta with tag ${tag} not found`);
    }
    const index = this.etiquetas.findIndex((etiqueta) => etiqueta.tag === tag);
    let etiqueta = this.etiquetas[index];
    etiqueta = {
      tag: tag,
      name: updateEtiqueDto.name || etiqueta.name,
      price: updateEtiqueDto.price || etiqueta.price,
      source: updateEtiqueDto.source || etiqueta.source,
      status: updateEtiqueDto.status || etiqueta.status,
    };
    this.etiquetas[index] = etiqueta;

    return { ...findEtiqueta, data: etiqueta };
  }

  remove(tag: string): void {
    this.findOne(tag);
    this.etiquetas = this.etiquetas.filter((etiqueta) => etiqueta.tag !== tag);
  }

  setMetadata(metadata: MetadataFile): void {
    this.metadata = metadata;
  }
}
