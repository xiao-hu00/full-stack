import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import prisma from '@/prisma/client'
import xlsx from 'node-xlsx';

@Injectable()
export class CatService {

  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  async findAll() {
    const workSheetsFromFile = xlsx.parse(`./assets/pig1-12/第1季第1集泥坑-中英台词.xlsx`);
    console.log(workSheetsFromFile?.[0]?.data[1])
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
