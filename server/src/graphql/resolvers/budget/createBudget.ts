import { IsDate, IsOptional } from 'class-validator';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Budget } from '../../../entity/Budget';
import { MyContext } from '../../../types';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { defaultExpenseGroups, defaultIncomeGroups } from './helpers/budgetDefaults';
import { startOfMonth } from './helpers/startOfMonth';

@InputType()
class CreateBudgetInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  date: Date;
}

@ObjectType()
class CreateBudgetPayload {
  @Field()
  budget: Budget;
}

@Resolver()
export class CreateBudgetResolver {
  @Mutation(() => CreateBudgetPayload)
  @UseMiddleware(isAuthenticated)
  async createBudget(@Arg('input') input: CreateBudgetInput, @Ctx() { req }: MyContext) {
    const userId = req.session.userId;

    const budget = await Budget.create({
      userId,
      date: startOfMonth(input.date),
      incomeGroups: defaultIncomeGroups,
      expenseGroups: defaultExpenseGroups,
    }).save();

    return { budget };
  }
}
