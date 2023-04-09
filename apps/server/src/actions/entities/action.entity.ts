import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../common/base-entity.entity';
import { User } from '../../users/entities/user.entity';

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
  tags?: string[];

  @ManyToOne()
  user: User;
}
