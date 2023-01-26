import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompraCartao } from './entities/compra.cartao.entity';
import { AtualizarCompraCartaoInput } from './dto/atualizar-compra.cartao';
import { CadastrarCompraCartaoInput } from './dto/cadastrar-compra.cartao.input';
import { Cartao } from '../entities/cartao.entity';
@Injectable()
export class CompraCartaoService {
  constructor(
    @InjectRepository(CompraCartao)
    private readonly compraCartaoRepository: Repository<CompraCartao>,
    @InjectRepository(Cartao)
    private readonly cartaoRepository: Repository<Cartao>,
  ) {}

  async cadastrarCompraCartao(
    cadastrarCompraCartaoInput: CadastrarCompraCartaoInput,
  ): Promise<CompraCartao> {
    const compra = this.compraCartaoRepository.create(
      cadastrarCompraCartaoInput,
    );
    compra.numeroCartao = cadastrarCompraCartaoInput.numeroCartao;
    const exists = await this.cartaoRepository.count({
      where: { numeroCartao: compra.numeroCartao },
    });

    if (exists == 0) {
      return {
        compraId: '0',
        nomeCompra: cadastrarCompraCartaoInput.nomeCompra,
        numeroCartao: cadastrarCompraCartaoInput.numeroCartao,
        dataCompra: cadastrarCompraCartaoInput.dataCompra,
        quantidadeParcelas: cadastrarCompraCartaoInput.quantidadeParcelas,
        valorCompra: cadastrarCompraCartaoInput.valorCompra,
        observacao: 'Cartão não existe',
      };
    }

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
    const compra = await this.compraCartaoRepository.findOne({
      where: { compraId },
    });
    if (!compra) {
      return {
        compraId: compraId,
        nomeCompra: ' ',
        dataCompra: '',
        valorCompra: 0,
        quantidadeParcelas: 0,
        numeroCartao: '',
        observacao: 'Removido',
      };
    }
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
