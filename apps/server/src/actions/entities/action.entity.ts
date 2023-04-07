import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../common/base-entity.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ collection: 'actions' })
export class Action extends BaseEntity {
  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  priority: number;

  @Property()
  dueDate: Date;

  @Property()
  tags: string[];

  @ManyToOne()
  user: User;
}
