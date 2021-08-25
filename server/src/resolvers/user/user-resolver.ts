import argon2 from 'argon2';
import { Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { MyContext } from '../../types';
import { CreateUserArgs } from './_inputs';
import { CreateUserPayload } from './_payloads';

@Resolver(() => User)
export class UserResolver {
  //
  @Query(() => User, { nullable: true })
  async me(@Ctx() { currentUser }: MyContext) {
    return currentUser;
  }

  @Mutation(() => CreateUserPayload)
  async createUser(@Args() args: CreateUserArgs, @Ctx() { session }: MyContext) {
    const user = User.create({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email.toLowerCase(),
      password: await argon2.hash(args.password),
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
