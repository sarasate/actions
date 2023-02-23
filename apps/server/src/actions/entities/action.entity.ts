import { Entity } from '@mikro-orm/core';
import { BaseEntity } from '../../common/base-entity.entity';

@Entity({ collection: 'actions' })
export class Action extends BaseEntity {}
