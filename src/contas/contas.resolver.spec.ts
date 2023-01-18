import { Test, TestingModule } from '@nestjs/testing';
import { ContasResolver } from './contas.resolver';
import { ContasService } from './contas.service';

describe('UsersResolver', () => {
  let resolver: ContasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContasResolver, ContasService],
    }).compile();

    resolver = module.get<ContasResolver>(ContasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
