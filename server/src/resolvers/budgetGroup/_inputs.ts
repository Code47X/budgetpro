import { Field, InputType } from 'type-graphql';

@InputType()
export class ReorderBudgetItemsInput {
  @Field()
  id: number;

  @Field(() => [BudgetItemInput])
  budgetItems: BudgetItemInput[];
}

@InputType()
class BudgetItemInput {
  @Field()
  id: number;
}
