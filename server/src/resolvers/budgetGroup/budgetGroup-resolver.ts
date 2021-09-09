import { Arg, Authorized, FieldResolver, Mutation, Resolver, Root } from 'type-graphql';
import { BudgetGroup } from '../../entity/BudgetGroup';
import { ReorderBudgetItemsInput } from './_inputs';

@Resolver(() => BudgetGroup)
export class BudgetGroupResolver {
  //
  @Authorized()
  @Mutation(() => BudgetGroup, { nullable: true })
  async reorderBudgetItems(@Arg('input') input: ReorderBudgetItemsInput) {
    const budgetGroup = await BudgetGroup.findOne({ where: { id: input.id } });

    const newItemPositions = input.budgetItems.map((item, index) => ({
      ...item,
      position: index,
    }));

    if (budgetGroup) {
      BudgetGroup.merge(budgetGroup, { budgetItems: newItemPositions });
      return await budgetGroup.save();
    }

    return null;
  }

  @FieldResolver()
  budgetItems(@Root() budgetGroup: BudgetGroup) {
    return budgetGroup.budgetItems.sort((a, b) => a.position - b.position);
  }
}
