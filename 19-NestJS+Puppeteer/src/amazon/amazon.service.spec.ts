import { Test, TestingModule } from '@nestjs/testing';
import { AmazonService } from './amazon.service';

describe('AmazonService', () => {
  let service: AmazonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmazonService],
    }).compile();

    service = module.get<AmazonService>(AmazonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
