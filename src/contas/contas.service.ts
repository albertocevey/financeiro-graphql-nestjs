import { Injectable, NotFoundException } from '@nestjs/common';
import { Contas } from './entities/contas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTipoContaInput,
  TipoContas,
} from './dto/create-tipo-conta.input';
import { UpdateContasInput } from './dto/atualizar-boleto.input';

@Injectable()
export class ContasService {
  constructor(
    @InjectRepository(Contas)
    private readonly contasRepository: Repository<Contas>,
  ) {}

  async create(createUserInput: CreateTipoContaInput): Promise<Contas> {
    const user = this.contasRepository.create(createUserInput);
    return await this.contasRepository.save(user);
  }

  async findAll(): Promise<Array<Contas>> {
    return await this.contasRepository.find();
  }

  async findOne(contaTipoId: string): Promise<Contas> {
    const user = await this.contasRepository.findOne({
      where: { contaTipoId },
    });
    if (!user) {
      throw new NotFoundException(`Conta #${contaTipoId} não localizada`);
    }
    return user;
  }

  async update(
    contaTipoId: string,
    updateUserInput: UpdateContasInput,
  ): Promise<Contas> {
    const user = await this.contasRepository.preload({
      contaTipoId: contaTipoId,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException(`Conta #${contaTipoId} não localizada`);
    }
    return this.contasRepository.save(user);
  }

  async remove(contaTipoId: string): Promise<Contas> {
    const user = await this.contasRepository.findOne({
      where: { contaTipoId },
    });
    await this.contasRepository.delete(user);
    return {
      contaTipoId: contaTipoId,
      nomeConta: user.nomeConta,
      tipoConta: user.tipoConta,
      valor: user.valor,
      observacao: 'Removido',
      user: null,
    };
  }
}
