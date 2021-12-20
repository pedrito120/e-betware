import { Test, TestingModule } from '@nestjs/testing';
import { OrdersBooksController } from './orders-books.controller';

describe('OrdersBooksController', () => {
  let controller: OrdersBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersBooksController],
    }).compile();

    controller = module.get<OrdersBooksController>(OrdersBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
