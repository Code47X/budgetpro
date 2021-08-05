import argon2 from 'argon2';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Args, ArgsType, Ctx, Field, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { MyContext } from '../../types';

@ArgsType()
class LoginArgs {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => Boolean)
  async login(@Args() { email, password }: LoginArgs, @Ctx() { session }: MyContext) {
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    const validPassword = !!user && (await argon2.verify(user.password, password));

    if (user && validPassword) {
      session.userId = user.id;
      return true;
    }

    return false;
  }
}
