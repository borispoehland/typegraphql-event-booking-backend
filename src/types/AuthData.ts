import { Field, ID, Int, ObjectType } from 'type-graphql';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
@ObjectType()
export class AuthData {
  @Field(() => ID)
  userId: string;

  @Field()
  token: string;

  @Field(() => Int)
  tokenExpiration: number;
}
/* eslint-enable @typescript-eslint/explicit-function-return-type */
