import { Field, ObjectType } from 'type-graphql';
import { User } from '../../entity/User';
import { ErrorMessage } from '../_types_/ErrorMessage';

@ObjectType()
export class CreateUserPayload {
  @Field({ nullable: true })
  user: User;

  @Field({ nullable: true })
  error: ErrorMessage;
}
