import { Resolver, Mutation, Arg, InputType, Field, Query } from "type-graphql";
import { User } from "../entity/User";
import argon2 from "argon2";
import { AuthenticationError } from "apollo-server-errors";
import { IsEmail } from "class-validator";

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
  me() {
    return null;
  }

  @Mutation(() => User)
  async register(@Arg("options") options: RegisterUserInput) {
    const hashedPassword = await argon2.hash(options.password);

    return User.create({
      firstName: options.firstName,
      lastName: options.lastName,
      email: options.email,
      password: hashedPassword,
    }).save();
  }

  @Mutation(() => User)
  async login(@Arg("options") options: LoginUserInput) {
    const user = await User.findOne({ where: { email: options.email } });
    const validPassword = !user ? false : await argon2.verify(user.password, options.password);

    if (!user || !validPassword) {
      throw new AuthenticationError("Invalid login");
    }

    return user;
  }
}
