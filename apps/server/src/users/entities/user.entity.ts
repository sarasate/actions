import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../common/base-entity.entity';

@Entity({ collection: 'users' })
export class User extends BaseEntity {
  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  // TODO add refresh token property
}
