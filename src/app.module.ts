import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { UsersModule } from './users/users.module';
import { ContasModule } from './contas/contas.module';
import { AuthGuard, KeycloakConnectModule } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
dotenv.config();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './schema.gql',
      playground: true,
      introspection: true,
    }),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    KeycloakConnectModule.register({
      authServerUrl: 'http://172.21.108.32:8080/auth',
      realm: 'controle-financeiro',
      clientId: 'controle-financeiro-app',
      secret: 'LDQ0HzsVvuh5CznSCpqKxS1jeCwFu78u',
      // optional if you want to retrieve JWT from cookie
      // cookieKey: 'KEYCLOAK_JWT',
    }),
    UsersModule,
    ContasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
