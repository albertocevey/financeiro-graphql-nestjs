import { InputType, Field, PickType } from '@nestjs/graphql';
import { CadastrarCartaoInput } from '../../dto/cadastrar-cartao.input';

@InputType()
export class CadastrarCompraCartaoInput extends PickType(CadastrarCartaoInput, [
  'numeroCartao',
] as const) {
  @Field(() => String, { description: 'Nome da Compra' })
  nomeCompra: string;
  @Field(() => Number, { description: 'Valor da compra' })
  valorCompra: number;
  @Field(() => Number, { description: 'Numero de parcelas da compra' })
  quantidadeParcelas: number;
  @Field(() => Date, { description: 'Data da compra' })
  dataCompra: Date;
  @Field(() => String, {
    description: 'Comentario da compra',
    nullable: true,
  })
  observacao?: string;
}
