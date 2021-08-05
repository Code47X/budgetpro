import { IsInt, IsPositive, Max, Min } from 'class-validator';
import {
  Args,
  ArgsType,
  Authorized,
  Field,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import { CurrentUser } from '../../decorators/CurrentUser';
import { Budget } from '../../entity/Budget';
import { User } from '../../entity/User';
import { ErrorMessage } from '../_types_/ErrorMessage';
import { defaultExpenseGroups, defaultIncomeGroups } from './helpers/defaults';

@ArgsType()
class CreateBudgetArgs {
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

@ObjectType()
class CreateBudgetPayload {
  @Field({ nullable: true })
  budget: Budget;

  @Field({ nullable: true })
  error: ErrorMessage;
}

@Resolver()
export class CreateBudgetResolver {
  @Authorized()
  @Mutation(() => CreateBudgetPayload)
  async createBudget(@Args() { month, year }: CreateBudgetArgs, @CurrentUser() user: User) {
    const budget = await Budget.create({
      user,
      month,
      year,
      incomeGroups: defaultIncomeGroups,
      expenseGroups: defaultExpenseGroups,
    }).save();

    return { budget };
  }
}
