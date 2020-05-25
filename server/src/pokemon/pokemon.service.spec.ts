import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { PokemonRepository } from './pokemon.repository';

const mockPokemonRepository = () => ({
  signUp: jest.fn(),
  validateUserPassword: jest.fn(),
});

describe('PokemonService', () => {
  let service: PokemonService;
  let pokemonRepository: PokemonRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: PokemonRepository, useFactory: mockPokemonRepository },
      ],
    }).compile();

    service = await module.get<PokemonService>(PokemonService);
    pokemonRepository = await module.get<PokemonRepository>(PokemonRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
