import { EntityRepository } from '@mikro-orm/mongodb';
import { Action } from './entities/action.entity';

export class ActionRepository extends EntityRepository<Action> {}
