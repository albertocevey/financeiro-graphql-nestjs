import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CadastrarBoletoInput } from './dto/cadastrar-boleto.input';
import { Boleto } from './entities/boleto.entity';
import { AtualizarBoletoInput } from './dto/atualizar-boleto.input';
@Injectable()
export class BoletoService {
  constructor(
    @InjectRepository(Boleto)
    private readonly boletoRepository: Repository<Boleto>,
  ) {}

  async cadastrarBoleto(
    cadastrarBoletoInput: CadastrarBoletoInput,
  ): Promise<Boleto> {
    const user = this.boletoRepository.create(cadastrarBoletoInput);
    return await this.boletoRepository.save(user);
  }

  async findAll(): Promise<Array<Boleto>> {
    return await this.boletoRepository.find();
  }

  async findOne(boletoId: string): Promise<Boleto> {
    const user = await this.boletoRepository.findOne({
      where: { boletoId },
    });
    if (!user) {
      throw new NotFoundException(`Conta #${boletoId} não localizada`);
    }
    return user;
  }

  async atualizarBoleto(
    boletoId: string,
    atualizarBoletoInput: AtualizarBoletoInput,
  ): Promise<Boleto> {
    const user = await this.boletoRepository.preload({
      boletoId: boletoId,
      ...atualizarBoletoInput,
    });
    if (!user) {
      throw new NotFoundException(`Conta #${boletoId} não localizada`);
    }
    return this.boletoRepository.save(user);
  }

  async removerBoleto(boletoId: string): Promise<Boleto> {
    const user = await this.findOne(boletoId);
    await this.boletoRepository.remove(user);
    return {
      boletoId: boletoId,
      nomeBoleto: user.nomeBoleto,
      dataVencimento: user.dataVencimento,
      valor: user.valor,
      observacao: 'Removido',
    };
  }
}
