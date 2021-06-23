import { Resolver, Mutation, Arg, InputType, Field, Query, Ctx } from "type-graphql";
import { User } from "../entity/User";
import argon2 from "argon2";
import { AuthenticationError } from "apollo-server-errors";
import { IsEmail } from "class-validator";
import { Context } from "src/types";

@InputType()
class RegisterUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@InputType()
class LoginUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

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
  async register(@Arg("options") options: RegisterUserInput, @Ctx() { req }: Context) {
    const hashedPassword = await argon2.hash(options.password);

    const user = await User.create({
      firstName: options.firstName,
      lastName: options.lastName,
      email: options.email,
      password: hashedPassword,
    }).save();

    req.session.userId = user.id;

    return user;
  }

  @Mutation(() => User)
  async login(@Arg("options") options: LoginUserInput, @Ctx() { req }: Context) {
    const user = await User.findOne({ where: { email: options.email } });
    const validPassword = !user ? false : await argon2.verify(user.password, options.password);

    if (!user || !validPassword) {
      throw new AuthenticationError("Invalid login");
    }

    req.session.userId = user.id;

    return user;
  }
}
