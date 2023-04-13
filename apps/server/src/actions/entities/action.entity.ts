import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../common/base-entity.entity';
import { User } from '../../users/entities/user.entity';

export enum ActionStatus {
  OPEN = 'open',
  ACTIVE = 'active',
  DONE = 'done',
  CANCELED = 'canceled',
  DELETED = 'deleted',
}
@Entity({ collection: 'actions' })
export class Action extends BaseEntity {
  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ nullable: true })
  priority?: number;

  @Property({ nullable: true })
  dueDate?: Date;

  @Property({ nullable: true })
  duration?: number;

  @Property({ nullable: true })
  tags?: string[];

  @Enum({ items: () => ActionStatus, default: ActionStatus.OPEN })
  status = ActionStatus.OPEN;

  @ManyToOne()
  user: User;
}
