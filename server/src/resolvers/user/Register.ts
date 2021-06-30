import argon2 from "argon2";
import { IsEmail } from "class-validator";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { Context } from "../../types";

@InputType()
class RegisterInput {
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

@Resolver()
export class RegisterResolver {
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
