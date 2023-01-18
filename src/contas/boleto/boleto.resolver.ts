import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CadastrarBoletoInput } from './dto/cadastrar-boleto.input';
import { AtualizarBoletoInput } from './dto/atualizar-boleto.input';
import { Boleto } from './entities/boleto.entity';
import { BoletoService } from './boleto.service';

@Resolver(() => Boleto)
export class BoletoResolver {
  constructor(private readonly boletoService: BoletoService) {}

  @Mutation(() => Boleto)
  cadastrarBoleto(
    @Args('cadastrarBoletoInput') cadastrarBoletoInput: CadastrarBoletoInput,
  ) {
    return this.boletoService.cadastrarBoleto(cadastrarBoletoInput);
  }

  @Query(() => [Boleto], { name: 'boletos' })
  findAll() {
    return this.boletoService.findAll();
  }

  @Query(() => Boleto, { name: 'boleto' })
  findOne(@Args('boletoId', { type: () => String }) userId: string) {
    return this.boletoService.findOne(userId);
  }

  @Mutation(() => Boleto)
  atualizarBoleto(
    @Args('atualizarBoletoInput') atualizarBoletoInput: AtualizarBoletoInput,
  ) {
    return this.boletoService.atualizarBoleto(
      atualizarBoletoInput.boletoId,
      atualizarBoletoInput,
    );
  }

  @Mutation(() => Boleto)
  removerBoleto(@Args('boletoId', { type: () => String }) boletoId: string) {
    return this.boletoService.removerBoleto(boletoId);
  }
}
