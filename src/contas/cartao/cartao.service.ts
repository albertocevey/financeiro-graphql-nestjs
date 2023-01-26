import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cartao } from './entities/cartao.entity';
import { AtualizarCartaoInput } from './dto/atualizar-cartao.input';
import { CadastrarCartaoInput } from './dto/cadastrar-cartao.input';
@Injectable()
export class CartaoService {
  constructor(
    @InjectRepository(Cartao)
    private readonly cartaoRepository: Repository<Cartao>,
  ) {}

  async cadastrarCartao(
    cadastrarCartaoInput: CadastrarCartaoInput,
  ): Promise<Cartao> {
    var cartao = this.cartaoRepository.create(cadastrarCartaoInput);
    const exists = await this.cartaoRepository.count({
      where: { numeroCartao: cartao.numeroCartao },
    });

    if (exists > 0) {
      return {
        cartaoId: '0',
        nomeTitular: cartao.nomeTitular,
        numeroCartao: cartao.numeroCartao,
        dataValidadeCartao: cartao.dataValidadeCartao,
        dataVencimentoFatura: cartao.dataVencimentoFatura,
        observacao: 'Cartão já existe',
      };
    }
    cartao = await this.cartaoRepository.save(cartao);
    return cartao;
  }

  async findAll(): Promise<Array<Cartao>> {
    return await this.cartaoRepository.find();
  }

  async findOne(cartaoId: string): Promise<Cartao> {
    const cartao = await this.cartaoRepository.findOne({
      where: { cartaoId },
    });
    if (!cartao) {
      throw new NotFoundException(`Conta #${cartaoId} não localizada`);
    }
    return cartao;
  }

  async atualizarCartao(
    cartaoId: string,
    atualizarCartaoInput: AtualizarCartaoInput,
  ): Promise<Cartao> {
    const cartao = await this.cartaoRepository.preload({
      cartaoId: cartaoId,
      ...atualizarCartaoInput,
    });
    if (!cartao) {
      throw new NotFoundException(`Conta #${cartaoId} não localizada`);
    }
    return this.cartaoRepository.save(cartao);
  }

  async removerCartao(cartaoId: string): Promise<Cartao> {
    const cartao = await this.cartaoRepository.findOne({
      where: { cartaoId: cartaoId },
    });
    if (!cartao) {
      return {
        cartaoId: cartaoId,
        nomeTitular: '',
        numeroCartao: '',
        dataValidadeCartao: '',
        dataVencimentoFatura: '',
        observacao: 'Cartão não localizado',
      };
    }
    await this.cartaoRepository.delete(cartao);
    return {
      cartaoId: cartaoId,
      nomeTitular: cartao.nomeTitular,
      numeroCartao: cartao.numeroCartao,
      dataValidadeCartao: cartao.dataValidadeCartao,
      dataVencimentoFatura: cartao.dataVencimentoFatura,
      observacao: 'Cartão Removido',
    };
  }
}
