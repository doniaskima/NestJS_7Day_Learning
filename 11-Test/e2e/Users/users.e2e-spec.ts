import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from '../../src/modules/Users/users.module';
import { INestApplication } from '@nestjs/common';
import { UserService } from 'src/modules/users/Services/users.service';

describe('users', () => {
  let app: INestApplication;
  const usersServiceMock = {
    getAllUsers: () => [
      { "_id": 1, "_name": "Donia", "_age": 21 },
      { "_id": 2, "_name": "Donia", "_age": 21 }
    ]
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UserService)
      .useValue(usersServiceMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body).toEqual(usersServiceMock.getAllUsers());
  });
});
