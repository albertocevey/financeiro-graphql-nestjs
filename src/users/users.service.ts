import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserInput } from './dto/login-user.input';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Users } from './models/users.model';
import { formToJSON } from 'axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private http: HttpService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { data } = await firstValueFrom(
      this.http.post(
        'http://172.21.108.32:8080/auth/realms/controle-financeiro/protocol/openid-connect/token',
        new URLSearchParams({
          client_id: 'realm-management',
          client_secret: 'elgcTVahH4hbzndML6UnnkRcCRWhZniu',
          grant_type: 'client_credentials',
        }),
      ),
    );

    let exists = await firstValueFrom(
      this.http.get(
        'http://172.21.108.32:8080/auth/admin/realms/controle-financeiro/users',
        {
          params: {
            email: createUserInput.email,
          },
          headers: {
            Authorization: 'Bearer ' + data.access_token,
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    if (exists.data.length > 0) {
      return {
        userId: 'Email já existe',
        cartoes: null,
      };
    }

    exists = await firstValueFrom(
      this.http.get(
        'http://172.21.108.32:8080/auth/admin/realms/controle-financeiro/users',
        {
          params: {
            username: createUserInput.username,
          },
          headers: {
            Authorization: 'Bearer ' + data.access_token,
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    if (exists.data.length > 0) {
      return {
        userId: 'Username já existe',
        cartoes: null,
      };
    }

    const newUser = await firstValueFrom(
      this.http.post(
        'http://172.21.108.32:8080/auth/admin/realms/controle-financeiro/users',
        {
          firstName: createUserInput.firstName,
          lastName: createUserInput.lastName,
          email: createUserInput.email,
          enabled: 'true',
          username: createUserInput.username,
        },
        {
          headers: {
            Authorization: 'Bearer ' + data.access_token,
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    if (!newUser && newUser.status != 200) {
      return {
        userId: 'error',
        cartoes: null,
      };
    }

    return {
      userId: '201 criado',
      cartoes: null,
    };
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find();
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async update(
    userId: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userRepository.preload({
      userId: userId,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(userId: string): Promise<User> {
    const user = await this.findOne(userId);
    await this.userRepository.remove(user);
    return {
      userId: userId,
      cartoes: null,
    };
  }

  async login(loginUserInput: LoginUserInput): Promise<Users> {
    const { data } = await firstValueFrom(
      this.http.post(
        'http://172.21.108.32:8080/auth/realms/controle-financeiro/protocol/openid-connect/token',
        new URLSearchParams({
          client_id: 'controle-financeiro-app',
          client_secret: 'LDQ0HzsVvuh5CznSCpqKxS1jeCwFu78u',
          grant_type: 'password',
          scope: 'openid',
          username: loginUserInput.login,
          password: loginUserInput.password,
        }),
      ),
    );
    const token = data.access_token;
    return { token };
  }
}
