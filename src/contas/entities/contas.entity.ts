import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TipoContas } from '../dto/create-tipo-conta.input';

@Entity()
@ObjectType()
export class Contas {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String, { description: 'id do tipo conta' })
  contaTipoId: string;
  @Column()
  @Field(() => String, { description: 'Tipo de conta' })
  tipoConta: TipoContas;
  @Column()
  @Field(() => String, { description: 'Nome da Conta' })
  nomeConta: string;
  @Column({ type: 'float' })
  @Field(() => Number, { description: 'Valor da Conta' })
  valor: number;
  @Column({ nullable: true })
  @Field(() => String, { description: 'Comentario sobre a conta' })
  observacao: string;
}
