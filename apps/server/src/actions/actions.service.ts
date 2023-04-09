import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { ActionRepository } from './action.repository';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Action } from './entities/action.entity';
import { OpenAIService } from '../open-ai/open-ai.service';

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
      orderBy: { priority: 'DESC', dueDate: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.actionRepository.findOne(id);
  }

  // TODO implement
  update(id: string, updateActionDto: UpdateActionDto) {
    return `This action updates a #${id} action`;
  }

  async remove(id: string) {
    const action = await this.actionRepository.findOne(id);
    return this.actionRepository.removeAndFlush(action);
  }
}
