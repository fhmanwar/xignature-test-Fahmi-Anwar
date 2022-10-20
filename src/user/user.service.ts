import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(data: CreateUserDto) {
    // const user = this.userRepository.create(data);
    const user = new User();
    user.name = data.name;
    user.username = data.username;
    const hash = await bcrypt.hash(data.password, 10);
    user.password = hash;
    await this.userRepository.save(user);
    return user;
  }

  async getAll(): Promise<User[]> {
    // return `This action returns all user`;
    return await this.userRepository.find();
  }

  async getByUsername(uname: string) {
    // return `This action returns a #${id} user`;
    return this.userRepository.findOne({ where: { username: uname } });
  }

  async getById(id: number) {
    // return `This action returns a #${id} user`;
    return this.userRepository.findOneBy({ id: id });
  }

  async update(id: number, data: Partial<CreateUserDto>) {
    // return `This action updates a #${id} user`;
    await this.userRepository.update({ id }, data);
    return await this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    // return `This action removes a #${id} user`;
    await this.userRepository.delete({ id });
    return { deleted: true };
  }
}
