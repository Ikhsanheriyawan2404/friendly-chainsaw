import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  indonesia_cities,
  indonesia_provinces,
  indonesia_districts,
  indonesia_villages,
  Prisma,
} from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getCities(params: {
    select?: Prisma.indonesia_citiesSelect;
  }): Promise<indonesia_cities[]> {
    const { select } = params;
    return this.prisma.indonesia_cities.findMany({
      select,
    });
  }

  getProvinces(params: {
    select?: Prisma.indonesia_provincesSelect;
  }): Promise<indonesia_provinces[]> {
    const { select } = params;
    return this.prisma.indonesia_provinces.findMany({
      select,
    });
  }

  getDistricts(params: {
    select?: Prisma.indonesia_districtsSelect;
  }): Promise<indonesia_districts[]> {
    const { select } = params;
    return this.prisma.indonesia_districts.findMany({
      select,
    });
  }

  getVillages(params: {
    select?: Prisma.indonesia_villagesSelect;
  }): Promise<indonesia_villages[]> {
    const { select } = params;
    return this.prisma.indonesia_villages.findMany({
      select,
    });
  }

  getSimple(): string {
    return 'Hello World!';
  }
}
