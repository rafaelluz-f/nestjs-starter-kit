import { Pokemon } from './pokemon.entity';
import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@EntityRepository(Pokemon)
export class PokemonRepository extends Repository<Pokemon> {
  private logger = new Logger('TasksController');

  async createPokemon(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    const { name } = createPokemonDto;
    const pokemon = new Pokemon();
    pokemon.name = name;

    try {
      await pokemon.save();
      return pokemon;
    } catch {
      this.logger.error(`Failed to create pokemon "${pokemon.name}"`);
      throw new InternalServerErrorException();
    }
  }
}
