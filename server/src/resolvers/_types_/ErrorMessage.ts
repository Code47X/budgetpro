import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ErrorMessage {
  @Field({ nullable: true })
  field: string;

  @Field()
  message: string;
}
