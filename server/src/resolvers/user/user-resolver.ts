import argon2 from 'argon2';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { MyContext } from '../../types';
import { CreateUserInput } from './_inputs';
import { CreateUserPayload } from './_payloads';

@Resolver(() => User)
export class UserResolver {
  //
  @Query(() => User, { nullable: true })
  async me(@Ctx() { currentUser }: MyContext) {
    return currentUser;
  }

  @Mutation(() => CreateUserPayload)
  async createUser(@Arg('input') input: CreateUserInput, @Ctx() { session }: MyContext) {
    const user = User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email.toLowerCase(),
      password: await argon2.hash(input.password),
    });

    return user
      .save()
      .then(user => {
        session.userId = user.id;
        return { user };
      })
      .catch(() => {
        return { error: { message: 'Email already exists' } };
      });
  }
}
