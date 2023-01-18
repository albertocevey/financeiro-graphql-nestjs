import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Cartao {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id do cartao' })
  cartaoId: string;
  @Column()
  @Field(() => String, { description: 'Nome Titular Cartão' })
  nomeTitular: string;
  @PrimaryColumn()
  @Field(() => Number, { description: 'Numero do cartão' })
  numeroCartao: number;
  @Column()
  @Field(() => String, { description: 'Validade do cartão (MM/AA)' })
  dataValidadeCartao: string;
  @Column()
  @Field(() => String, { description: 'Data de vencimento da fatura' })
  dataVencimentoFatura: string;
  @Column({ nullable: true })
  @Field(() => String, {
    description: 'Comentarios sobre o cartão',
    nullable: true,
  })
  observacao?: string;
}
