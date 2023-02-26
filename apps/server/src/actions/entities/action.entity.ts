import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../common/base-entity.entity';

@Entity({ collection: 'actions' })
export class Action extends BaseEntity {
  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;
}
