import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CadastrarCartaoInput } from './dto/cadastrar-cartao.input';
import { Cartao } from './entities/cartao.entity';
import { CartaoService } from './cartao.service';
import { AtualizarCartaoInput } from './dto/atualizar-cartao.input';

@Resolver(() => Cartao)
export class CartaoResolver {
  constructor(private readonly cartaoService: CartaoService) {}

  @Mutation(() => Cartao)
  cadastrarCartao(
    @Args('cadastrarCartaoInput') cadastrarCartaoInput: CadastrarCartaoInput,
  ) {
    return this.cartaoService.cadastrarCartao(cadastrarCartaoInput);
  }

  @Query(() => [Cartao], { name: 'cartoes' })
  findAll() {
    return this.cartaoService.findAll();
  }

  @Query(() => Cartao, { name: 'cartao' })
  findOne(@Args('cartaoId', { type: () => String }) cartaoId: string) {
    return this.cartaoService.findOne(cartaoId);
  }

  @Mutation(() => Cartao)
  atualizarCartao(
    @Args('atualizarCartaoInput') atualizarCartaoInput: AtualizarCartaoInput,
  ) {
    return this.cartaoService.atualizarCartao(
      atualizarCartaoInput.cartaoId,
      atualizarCartaoInput,
    );
  }

  @Mutation(() => Cartao)
  removerCartao(@Args('cartaoId', { type: () => String }) cartaoId: string) {
    return this.cartaoService.removerCartao(cartaoId);
  }
}
