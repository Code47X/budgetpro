import argon2 from 'argon2';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Args, ArgsType, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { MyContext } from '../../types';
import { ErrorMessage } from '../_types_/ErrorMessage';

@ArgsType()
class CreateUserArgs {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;
}

@ObjectType()
class CreateUserPayload {
  @Field({ nullable: true })
  user: User;

  @Field({ nullable: true })
  error: ErrorMessage;
}

@Resolver()
export class CreateUserResolver {
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
