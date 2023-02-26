import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ActionRepository } from './action.repository';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Action } from './entities/action.entity';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Action)
    private actionRepository: ActionRepository,
  ) {}

  create(createActionDto: CreateActionDto) {
    const action = this.actionRepository.create(createActionDto);
    return this.actionRepository.persistAndFlush(action);
  }

  findAll() {
    return this.actionRepository.findAll();
  }

  findOne(id: string) {
    return this.actionRepository.findOne(id);
  }

  // TODO implement
  update(id: string, updateActionDto: UpdateActionDto) {
    return `This action updates a #${id} action`;
  }

  remove(id: string) {
    const action = this.actionRepository.findOne(id);
    return this.actionRepository.removeAndFlush(action);
  }
}
