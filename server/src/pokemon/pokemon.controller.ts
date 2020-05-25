import {
  Controller,
  Logger,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
  Get,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './pokemon.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomName } from '../helpers/randomName';

@Controller('pokemon')
export class PokemonController {
  private logger = new Logger('PokemonController');
  constructor(private pokemonService: PokemonService) {}

  @Post()
  createPokemon(@Body() createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    console.log(createPokemonDto);
    return this.pokemonService.createPokemon(createPokemonDto);
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads/pokemon',
        filename: (req, file, cb) => {
          return cb(null, `${randomName()}_${file.originalname}`);
        },
      }),
    }),
  )
  upload(@UploadedFile() file) {
    console.log(file);
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    console.log(image);
    return res.sendFile(image, { root: 'uploads/pokemon' });
  }
}
