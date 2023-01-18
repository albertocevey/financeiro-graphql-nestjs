import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CadastrarCompraCartaoInput } from './dto/cadastrar-compra.cartao.input';
import { CompraCartao } from './entities/compra.cartao.entity';
import { CompraCartaoService } from './compra.cartao.service';
import { AtualizarCompraCartaoInput } from './dto/atualizar-compra.cartao';

@Resolver(() => CompraCartao)
export class CompraCartaoResolver {
  constructor(private readonly compraCartaoService: CompraCartaoService) {}

  @Mutation(() => CompraCartao)
  cadastrarCompraCartao(
    @Args('cadastrarCompraCartaoInput')
    cadastrarCompraCartaoInput: CadastrarCompraCartaoInput,
  ) {
    return this.compraCartaoService.cadastrarCompraCartao(
      cadastrarCompraCartaoInput,
    );
  }

  @Query(() => [CompraCartao], { name: 'compras' })
  findAll() {
    return this.compraCartaoService.findAll();
  }

  @Query(() => CompraCartao, { name: 'compra' })
  findOne(
    @Args('cadastrarCompraCartaoInput', { type: () => String })
    compraId: string,
  ) {
    return this.compraCartaoService.findOne(compraId);
  }

  @Mutation(() => CompraCartao)
  atualizarCompraCartao(
    @Args('atualizarCompraCartaoInput')
    atualizarCompraCartaoInput: AtualizarCompraCartaoInput,
  ) {
    return this.compraCartaoService.atualizarCompraCartao(
      atualizarCompraCartaoInput.compraId,
      atualizarCompraCartaoInput,
    );
  }

  @Mutation(() => CompraCartao)
  removerCompraCartao(
    @Args('compraId', { type: () => String }) compraId: string,
  ) {
    return this.compraCartaoService.removerCompraCartao(compraId);
  }
}
