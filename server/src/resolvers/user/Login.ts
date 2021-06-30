import { AuthenticationError } from "apollo-server-express";
import argon2 from "argon2";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { Context } from "../../types";

@InputType()
class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => User)
  async login(@Arg("input") input: LoginInput, @Ctx() { req }: Context) {
    const user = await User.findOne({ where: { email: input.email } });
    const validPassword = !user ? false : await argon2.verify(user.password, input.password);

    if (!user || !validPassword) {
      throw new AuthenticationError("Invalid login");
    }

    req.session.userId = user.id;

    return user;
  }
}
