import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity({ abstract: true })
@ObjectType()
export abstract class BaseEntity {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  @Field((type) => ID)
  id: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
