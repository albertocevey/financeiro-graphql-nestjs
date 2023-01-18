import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CadastrarCartaoInput } from './cadastrar-cartao.input';

@InputType()
export class AtualizarCartaoInput extends PartialType(CadastrarCartaoInput) {
  @Field(() => String)
  cartaoId: string;
}
