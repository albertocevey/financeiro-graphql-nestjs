import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Cartao } from 'src/contas/cartao/entities/cartao.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the user' })
  userId: string;
  @OneToMany(() => Cartao, (cartao) => cartao.numeroCartao)
  cartoes: Cartao[];
}
