import { Test, TestingModule } from '@nestjs/testing';
import { OrdersBooksService } from './orders-books.service';

describe('OrdersBooksService', () => {
  let service: OrdersBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersBooksService],
    }).compile();

    service = module.get<OrdersBooksService>(OrdersBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
