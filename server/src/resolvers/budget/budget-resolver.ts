import { Arg, Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { CurrentUser } from '../../decorators/CurrentUser';
import { Budget } from '../../entity/Budget';
import { User } from '../../entity/User';
import { defaultBudgetGroups } from './helpers/defaults';
import { BudgetDateInput, UpdateBudgetArgs } from './_inputs';
import { CreateBudgetPayload } from './_payloads';

@Resolver(() => Budget)
export class BudgetResolver {
  //
  @Authorized()
  @Query(() => Budget, { nullable: true })
  async budget(@Arg('input') { month, year }: BudgetDateInput, @CurrentUser() user: User) {
    return await Budget.findOne({
      user,
      month,
      year,
    });
  }

  @Authorized()
  @Mutation(() => CreateBudgetPayload)
  async createBudget(@Arg('input') { month, year }: BudgetDateInput, @CurrentUser() user: User) {
    const budget = await Budget.create({
      user,
      month,
      year,
      budgetGroups: defaultBudgetGroups,
    }).save();

    return { budget };
  }

  // Placeholder for reordering budgetGroups
  @Authorized()
  @Mutation(() => Budget, { nullable: true })
  async updateBudget(@Args() { id, budgetGroups }: UpdateBudgetArgs, @CurrentUser() user: User) {
    const budget = await Budget.findOne({ id, user });
    if (budget) {
      Budget.merge(budget, { budgetGroups });
      return await budget.save();
    }

    return null;
  }
}
