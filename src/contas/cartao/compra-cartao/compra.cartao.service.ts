import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompraCartao } from './entities/compra.cartao.entity';
import { AtualizarCompraCartaoInput } from './dto/atualizar-compra.cartao';
import { CadastrarCompraCartaoInput } from './dto/cadastrar-compra.cartao.input';
@Injectable()
export class CompraCartaoService {
  constructor(
    @InjectRepository(CompraCartao)
    private readonly compraCartaoRepository: Repository<CompraCartao>,
  ) {}

  async cadastrarCompraCartao(
    cadastrarCompraCartaoInput: CadastrarCompraCartaoInput,
  ): Promise<CompraCartao> {
    const compra = this.compraCartaoRepository.create(
      cadastrarCompraCartaoInput,
    );
    return await this.compraCartaoRepository.save(compra);
  }

  async findAll(): Promise<Array<CompraCartao>> {
    return await this.compraCartaoRepository.find();
  }

  async findOne(compraId: string): Promise<CompraCartao> {
    const compra = await this.compraCartaoRepository.findOne({
      where: { compraId },
    });
    if (!compra) {
      throw new NotFoundException(`Compra #${compraId} não localizada`);
    }
    return compra;
  }

  async atualizarCompraCartao(
    compraId: string,
    atualizarCompraCartaoInput: AtualizarCompraCartaoInput,
  ): Promise<CompraCartao> {
    const compra = await this.compraCartaoRepository.preload({
      compraId: compraId,
      ...atualizarCompraCartaoInput,
    });
    if (!compra) {
      throw new NotFoundException(`Fatura #${compraId} não localizada`);
    }
    return this.compraCartaoRepository.save(compra);
  }

  async removerCompraCartao(compraId: string): Promise<CompraCartao> {
    const compra = await this.findOne(compraId);
    await this.compraCartaoRepository.remove(compra);
    return {
      compraId: compraId,
      nomeCompra: compra.nomeCompra,
      dataCompra: compra.dataCompra,
      valorCompra: compra.valorCompra,
      quantidadeParcelas: compra.quantidadeParcelas,
      numeroCartao: compra.numeroCartao,
      observacao: 'Removido',
    };
  }
}
