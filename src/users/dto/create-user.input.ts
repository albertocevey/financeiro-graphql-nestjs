import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'user name login' })
  username: string;
  @Field(() => String, { description: 'email of user' })
  email: string;
  @Field(() => String, { description: 'first name of the user' })
  firstName: string;
  @Field(() => String, { description: 'last name of the user' })
  lastName: string;
}
