import { InputType, Field } from '@nestjs/graphql';
import { IsNull } from 'typeorm';

@InputType()
export class CadastrarCartaoInput {
  @Field(() => String, { description: 'Nome do Titular' })
  nomeTitular: string;
  @Field(() => String, { description: 'Numero do cartão' })
  numeroCartao: string;
  @Field(() => String, { description: 'Validade do cartão (MM/AA)' })
  dataValidadeCartao: string;
  @Field(() => String, { description: 'Data vencimento da fatura' })
  dataVencimentoFatura: string;
  @Field(() => String, {
    description: 'Comentario sobre o cartão',
    nullable: true,
  })
  observacao?: string;
}
