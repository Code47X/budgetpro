import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class CreateUserArgs {
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
