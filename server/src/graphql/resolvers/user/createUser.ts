import argon2 from 'argon2';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { User } from '../../../entity/User';
import { MyContext } from '../../../types';
import { FieldError } from '../../types/FieldError';

@InputType()
class CreateUserInput {
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
  fieldError: FieldError;
}

@Resolver()
export class CreateUserResolver {
  @Mutation(() => CreateUserPayload)
  async createUser(@Arg('input') input: CreateUserInput, @Ctx() { req }: MyContext) {
    const hashedPassword = await argon2.hash(input.password);

    const user = User.create({
      ...input,
      email: input.email.toLowerCase(),
      password: hashedPassword,
    });

    return user
      .save()
      .then(user => {
        req.session.userId = user.id;
        return { user } as CreateUserPayload;
      })
      .catch(() => {
        return {
          fieldError: { field: 'email', message: 'Email already exists' },
        } as CreateUserPayload;
      });
  }
}
