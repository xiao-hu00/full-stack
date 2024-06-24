import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import prisma from '@/prisma/client'

@Injectable()
export class CatService {

  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  async findAll() {
    const data = await prisma.cat.findMany()
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
