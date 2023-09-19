import { Test, TestingModule } from '@nestjs/testing';
import { AmazonController } from './amazon.controller';

describe('AmazonController', () => {
  let controller: AmazonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmazonController],
    }).compile();

    controller = module.get<AmazonController>(AmazonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
