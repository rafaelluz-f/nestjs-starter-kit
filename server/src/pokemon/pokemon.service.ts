import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokemonRepository } from './pokemon.repository';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonRepository)
    private pokemonRepository: PokemonRepository,
  ) {}

  async createPokemon(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    return this.pokemonRepository.createPokemon(createPokemonDto);
  }
}
