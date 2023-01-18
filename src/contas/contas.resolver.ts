import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateTipoContaInput } from './dto/create-tipo-conta.input';
import { Contas } from './entities/contas.entity';
import { ContasService } from './contas.service';
import { UpdateContasInput } from './dto/atualizar-boleto.input';

@Resolver(() => Contas)
export class ContasResolver {
  constructor(private readonly contasService: ContasService) {}

  @Mutation(() => Contas)
  cadastrarBoleto(
    @Args('createTipoContaInput') createContasInput: CreateTipoContaInput,
  ) {
    return this.contasService.create(createContasInput);
  }

  @Query(() => [Contas], { name: 'contas' })
  findAll() {
    return this.contasService.findAll();
  }

  @Query(() => Contas, { name: 'conta' })
  findOne(@Args('userId', { type: () => String }) userId: string) {
    return this.contasService.findOne(userId);
  }

  @Mutation(() => Contas)
  updateUser(@Args('updateUserInput') updateContasInput: UpdateContasInput) {
    return this.contasService.update(
      updateContasInput.contaTipoId,
      updateContasInput,
    );
  }

  @Mutation(() => Contas)
  removeUser(@Args('userId', { type: () => String }) contaTipoId: string) {
    return this.contasService.remove(contaTipoId);
  }
}
