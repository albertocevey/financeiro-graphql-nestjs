import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Users {
  @Field((type) => String)
  token: string;
}
