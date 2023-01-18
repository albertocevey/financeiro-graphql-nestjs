import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Cartao } from '../../entities/cartao.entity';

@Entity()
@ObjectType()
export class CompraCartao extends PickType(Cartao, ['numeroCartao'] as const) {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id da compra' })
  compraId: string;
  @Column()
  @Field(() => String, { description: 'Nome da compra' })
  nomeCompra: string;
  @Column({ type: 'float' })
  @Field(() => Number, { description: 'Valor da compra' })
  valorCompra: number;
  @Column()
  @Field(() => Number, { description: 'Quantidade de parcelas da compra' })
  quantidadeParcelas: number;
  @Column()
  @Field(() => Date, { description: 'Data da compra' })
  dataCompra: Date;
  @Column({ nullable: true })
  @Field(() => String, {
    description: 'Comentarios sobre a compra',
    nullable: true,
  })
  observacao?: string;
}
