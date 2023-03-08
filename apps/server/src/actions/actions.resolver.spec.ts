import { Test, TestingModule } from '@nestjs/testing';
import { ActionsResolver } from './actions.resolver';

describe('ActionsResolver', () => {
  let resolver: ActionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionsResolver],
    }).compile();

    resolver = module.get<ActionsResolver>(ActionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
