import { Test, TestingModule } from '@nestjs/testing';
import { WorkPlacesService } from './work-places.service';

describe('WorkPlacesService', () => {
  let service: WorkPlacesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkPlacesService],
    }).compile();

    service = module.get<WorkPlacesService>(WorkPlacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
