/*
    Copyright (C) 2021  Zbinden Yohan

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import { Test, TestingModule } from '@nestjs/testing';
import { createConnection } from 'typeorm';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
    const connection = await createConnection({
      type: 'sqlite',
      database: ':memory',
      dropSchema: true,
      entities: ['src/entity/**/*.ts'],
      synchronize: true,
      logging: false,
      name: 'testConnectionName',
    });
    controller = module.get<AppController>(AppController);
    return connection;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
