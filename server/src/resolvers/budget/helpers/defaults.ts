import { BudgetGroup } from '../../../entity/BudgetGroup';
import { BudgetItem } from '../../../entity/BudgetItem';

export const defaultBudgetGroups = [
  BudgetGroup.create({
    type: 'Income',
    label: 'Income',
    budgetItems: [
      BudgetItem.create({
        name: 'Paycheck 1',
        plannedAmount: 0.0,
      }),
      BudgetItem.create({
        name: 'Paycheck 2',
        plannedAmount: 0.0,
      }),
    ],
  }),
  BudgetGroup.create({
    type: 'Expense',
    label: 'Housing',
    budgetItems: [
      BudgetItem.create({
        name: 'Mortgage/Rent',
        plannedAmount: 0.0,
      }),
      BudgetItem.create({
        name: 'Electricity',
        plannedAmount: 0.0,
      }),
      BudgetItem.create({
        name: 'Internet',
        plannedAmount: 0.0,
      }),
      BudgetItem.create({
        name: 'Trash',
        plannedAmount: 0.0,
      }),
    ],
  }),
  BudgetGroup.create({
    type: 'Expense',
    label: 'Food',
    budgetItems: [
      BudgetItem.create({
        name: 'Groceries',
        plannedAmount: 0.0,
      }),
      BudgetItem.create({
        name: 'Restaurants',
        plannedAmount: 0.0,
      }),
    ],
  }),
];
