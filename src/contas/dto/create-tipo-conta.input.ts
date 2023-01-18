import { InputType, Field, registerEnumType } from '@nestjs/graphql';

export enum TipoContas {
  Boleto = 'Boleto',
  CartaoCredito = 'Cartão de Crédito',
}
registerEnumType(TipoContas, {
  name: 'TipoContas',
});

@InputType()
export class CreateTipoContaInput {
  @Field(() => TipoContas, { description: 'Tipo de conta' })
  tipoConta: TipoContas;
  @Field(() => String, { description: 'Nome da Conta' })
  nomeConta: string;
  @Field(() => Number, { description: 'Valor da Conta' })
  valor: number;
  @Field(() => String, { description: 'Comentario sobre a conta' })
  observacao: string;
}
