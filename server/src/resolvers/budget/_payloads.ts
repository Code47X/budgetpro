import { Field, ObjectType } from 'type-graphql';
import { Budget } from '../../entity/Budget';
import { ErrorMessage } from '../_types_/ErrorMessage';

@ObjectType()
export class CreateBudgetPayload {
  @Field({ nullable: true })
  budget: Budget;

  @Field({ nullable: true })
  error: ErrorMessage;
}
