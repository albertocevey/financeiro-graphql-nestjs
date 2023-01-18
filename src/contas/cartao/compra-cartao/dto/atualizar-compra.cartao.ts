import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CadastrarCompraCartaoInput } from './cadastrar-compra.cartao.input';

@InputType()
export class AtualizarCompraCartaoInput extends PartialType(
  CadastrarCompraCartaoInput,
) {
  @Field(() => String)
  compraId: string;
}
