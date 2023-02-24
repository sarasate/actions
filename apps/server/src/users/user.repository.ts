import { EntityRepository } from '@mikro-orm/mongodb';
import { User } from './entities/user.entity';

export class UserRepository extends EntityRepository<User> {}
