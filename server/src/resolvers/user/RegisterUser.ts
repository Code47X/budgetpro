import argon2 from "argon2";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { User } from "../../entity/User";
import { Context } from "../../types";

@InputType()
class RegisterUserInput {
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
class EmailAlreadyExists {
  @Field()
  message: string;
}

const RegisterUserResult = createUnionType({
  name: "RegisterUserResult",
  types: () => [User, EmailAlreadyExists] as const,
  resolveType: (value) => {
    if ("id" in value) {
      return User;
    }
    if ("message" in value) {
      return EmailAlreadyExists;
    }
    return undefined;
  },
});

@Resolver()
export class RegisterUserResolver {
  @Mutation(() => RegisterUserResult)
  async register(@Arg("input") input: RegisterUserInput, @Ctx() { req }: Context) {
    const hashedPassword = await argon2.hash(input.password);

    const user = User.create({
      ...input,
      email: input.email.toLowerCase(),
      password: hashedPassword,
    });

    return user
      .save()
      .then((user) => {
        req.session.userId = user.id;
        return user;
      })
      .catch(() => {
        return { message: "Email already exists" } as EmailAlreadyExists;
      });
  }
}
