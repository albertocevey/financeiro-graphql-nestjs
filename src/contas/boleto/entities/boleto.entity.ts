import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Boleto {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String, { description: 'id do boleto' })
  boletoId: string;
  @Column()
  @Field(() => String, { description: 'Nome Boleto' })
  nomeBoleto: string;
  @Column({ type: 'float' })
  @Field(() => Number, { description: 'Valor do Boleto' })
  valor: number;
  @Column()
  @Field(() => Date, { description: 'Data de vencimento do boleto' })
  dataVencimento: Date;
  @Column({ nullable: true })
  @Field(() => String, { description: 'Comentario sobre o boleto' })
  observacao: string;
}
