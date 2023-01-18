import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateTipoContaInput } from './create-tipo-conta.input';

@InputType()
export class UpdateContasInput extends PartialType(CreateTipoContaInput) {
  @Field(() => String)
  contaTipoId: string;
}
