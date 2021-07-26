import argon2 from 'argon2';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from 'type-graphql';
import { User } from '../../../entity/User';
import { MyContext } from '../../../types';
import { FieldError } from '../../types/FieldError';

@InputType()
class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

@ObjectType()
class LoginPayload {
  @Field({ nullable: true })
  user: User;

  @Field({ nullable: true })
  fieldError: FieldError;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginPayload)
  async login(@Arg('input') input: LoginInput, @Ctx() { req }: MyContext) {
    const user = await User.findOne({ where: { email: input.email.toLowerCase() } });
    if (!user) {
      return { fieldError: { field: 'email', message: 'Email not found' } } as LoginPayload;
    }

    const validPassword = await argon2.verify(user.password, input.password);
    if (!validPassword) {
      return { fieldError: { field: 'password', message: 'Invalid password' } } as LoginPayload;
    }

    req.session.userId = user.id;
    return { user } as LoginPayload;
  }
}
