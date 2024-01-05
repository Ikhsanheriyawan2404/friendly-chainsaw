import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  async getTest(@Res() res: Response): Promise<Response> {
    const villages = await this.appService.getVillages({
      select: {
        id: true,
        name: true,
        meta: true,
      },
    });

    const cities = await this.appService.getCities({
      select: {
        id: true,
        name: true,
        meta: true,
      },
    });

    const districts = await this.appService.getDistricts({
      select: {
        id: true,
        name: true,
        meta: true,
      },
    });

    const provinces = await this.appService.getProvinces({
      select: {
        id: true,
        name: true,
        meta: true,
      },
    });

    const mergedData = [...provinces, ...cities, ...districts, ...villages];

    return res.status(200).json({
      message: 'Hello World!',
      data: mergedData,
    });
  }

  @Get('/simple')
  async getSimple(@Res() res: Response): Promise<Response> {
    return res.status(200).json({
      message: 'Hello World!',
    });
  }
}
