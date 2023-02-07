import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'login of the user' })
  login: string;
  @Field(() => String, { description: 'password of the user' })
  password: string;
}
