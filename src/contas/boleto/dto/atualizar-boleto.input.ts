import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CadastrarBoletoInput } from './cadastrar-boleto.input';

@InputType()
export class AtualizarBoletoInput extends PartialType(CadastrarBoletoInput) {
  @Field(() => String)
  boletoId: string;
}
