import { IsInt, IsPositive, Max, Min } from 'class-validator';
import { ArgsType, Field, InputType, Int } from 'type-graphql';

@InputType()
export class BudgetDateInput {
  @Field(() => Int)
  @IsInt()
  @Min(0)
  @Max(11)
  month: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  year: number;
}

@ArgsType()
export class UpdateBudgetArgs {
  @Field()
  id: number;

  @Field(() => [BudgetGroupInput])
  budgetGroups: BudgetGroupInput[];
}

@InputType()
class BudgetGroupInput {
  @Field()
  id: number;

  @Field()
  label: string;
}
