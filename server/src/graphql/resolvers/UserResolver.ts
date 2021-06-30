import { Resolver, Mutation, Arg, Query, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import argon2 from "argon2";
import { AuthenticationError } from "apollo-server-errors";
import { Context } from "src/types";
import { RegisterInput, LoginInput } from "../types";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context) {
    if (!req.session.userId) {
      return undefined;
    }

    const user = await User.findOne(req.session.userId);
    return user;
  }

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

  @Mutation(() => User)
  async register(@Arg("input") input: RegisterInput, @Ctx() { req }: Context) {
    const hashedPassword = await argon2.hash(input.password);

    const user = await User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: hashedPassword,
    }).save();

    req.session.userId = user.id;

    return user;
  }
}
