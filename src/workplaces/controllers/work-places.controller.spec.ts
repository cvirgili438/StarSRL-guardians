import { Test, TestingModule } from '@nestjs/testing';
import { WorkPlacesController } from './work-places.controller';

describe('WorkPlacesController', () => {
  let controller: WorkPlacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkPlacesController],
    }).compile();

    controller = module.get<WorkPlacesController>(WorkPlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
