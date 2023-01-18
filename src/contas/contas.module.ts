import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContasResolver } from './contas.resolver';
import { Contas } from './entities/contas.entity';
import { ContasService } from './contas.service';
import { BoletoService } from './boleto/boleto.service';
import { BoletoResolver } from './boleto/boleto.resolver';
import { Boleto } from './boleto/entities/boleto.entity';
import { Cartao } from './cartao/entities/cartao.entity';
import { CartaoService } from './cartao/cartao.service';
import { CartaoResolver } from './cartao/cartao.resolver';
import { CompraCartao } from './cartao/compra-cartao/entities/compra.cartao.entity';
import { CompraCartaoService } from './cartao/compra-cartao/compra.cartao.service';
import { CompraCartaoResolver } from './cartao/compra-cartao/compra.cartao.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Contas, Boleto, Cartao, CompraCartao])],
  providers: [
    ContasResolver,
    ContasService,
    BoletoService,
    BoletoResolver,
    CartaoService,
    CartaoResolver,
    CompraCartaoService,
    CompraCartaoResolver,
  ],
})
export class ContasModule {}
