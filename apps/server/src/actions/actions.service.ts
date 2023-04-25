import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { ActionRepository } from './action.repository';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Action } from './entities/action.entity';
import { OpenAIService } from '../open-ai/open-ai.service';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(Action)
    private actionRepository: ActionRepository,
    private readonly openAIService: OpenAIService,
  ) {}

  async create(createActionDto: CreateActionDto, user: User) {
    const action = this.actionRepository.create(createActionDto);
    action.user = user;
    await this.actionRepository.persistAndFlush(action);
    return action;
  }

  findAll() {
    return this.actionRepository.findAll({
      orderBy: { priority: 'DESC', dueDate: 'ASC' },
    });
  }

  findOne(id: string) {
    return this.actionRepository.findOne(id);
  }

  // TODO implement
  async update(id: string, updateActionDto: UpdateActionDto) {
    const action = await this.actionRepository.findOne(id);
    wrap(action).assign(updateActionDto);
    this.actionRepository.persist(action).flush();
    return action;
  }

  async remove(id: string) {
    const action = await this.actionRepository.findOne(id);
    return this.actionRepository.removeAndFlush(action);
  }
}
