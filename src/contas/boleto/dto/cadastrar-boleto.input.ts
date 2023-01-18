import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CadastrarBoletoInput {
  @Field(() => String, { description: 'Nome do boleto' })
  nomeBoleto: string;
  @Field(() => Number, { description: 'Valor do boleto' })
  valor: number;
  @Field(() => String, { description: 'Observações do boleto' })
  observacao: string;
  @Field(() => Date, { description: 'Data vencimento do boleto' })
  dataVencimento: Date;
}
