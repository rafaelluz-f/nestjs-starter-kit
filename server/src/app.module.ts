import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PokemonModule } from './pokemon/pokemon.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PokemonModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
