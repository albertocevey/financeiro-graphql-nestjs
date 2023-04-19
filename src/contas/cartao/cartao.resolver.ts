import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CadastrarCartaoInput } from './dto/cadastrar-cartao.input';
import { Cartao } from './entities/cartao.entity';
import { CartaoService } from './cartao.service';
import { AtualizarCartaoInput } from './dto/atualizar-cartao.input';

@Resolver(() => Cartao)
export class CartaoResolver {
  constructor(private readonly cartaoService: CartaoService) {}

  @Mutation(() => Cartao)
  async cadastrarCartao(
    @Args('cadastrarCartaoInput') cadastrarCartaoInput: CadastrarCartaoInput,
  ) {
    return await this.cartaoService.cadastrarCartao(cadastrarCartaoInput);
  }

  @Query(() => [Cartao], { name: 'cartoes' })
  async findAll() {
    return await this.cartaoService.findAll();
  }

  @Query(() => Cartao, { name: 'cartao' })
  async findOne(@Args('cartaoId', { type: () => String }) cartaoId: string) {
    return await this.cartaoService.findOne(cartaoId);
  }

  @Mutation(() => Cartao)
  async atualizarCartao(
    @Args('atualizarCartaoInput') atualizarCartaoInput: AtualizarCartaoInput,
  ) {
    return await this.cartaoService.atualizarCartao(
      atualizarCartaoInput.cartaoId,
      atualizarCartaoInput,
    );
  }

  @Mutation(() => Cartao)
  async removerCartao(
    @Args('cartaoId', { type: () => String }) cartaoId: string,
  ) {
    const teste = await this.cartaoService.removerCartao(cartaoId);
    return teste;
  }
}
