import { Expense } from '../../../../entity/Expense';
import { ExpenseGroup } from '../../../../entity/ExpenseGroup';
import { Income } from '../../../../entity/Income';
import { IncomeGroup } from '../../../../entity/IncomeGroup';

export const defaultIncomeGroups = [
  IncomeGroup.create({
    label: 'Income',
    incomes: [
      Income.create({
        name: 'Paycheck 1',
        plannedAmount: 0.0,
      }),
      Income.create({
        name: 'Paycheck 2',
        plannedAmount: 0.0,
      }),
    ],
  }),
];

export const defaultExpenseGroups = [
  ExpenseGroup.create({
    label: 'Housing',
    expenses: [
      Expense.create({
        name: 'Mortgage/Rent',
        plannedAmount: 0.0,
      }),
      Expense.create({
        name: 'Electricity',
        plannedAmount: 0.0,
      }),
      Expense.create({
        name: 'Internet',
        plannedAmount: 0.0,
      }),
      Expense.create({
        name: 'Trash',
        plannedAmount: 0.0,
      }),
    ],
  }),
  ExpenseGroup.create({
    label: 'Food',
    expenses: [
      Expense.create({
        name: 'Groceries',
        plannedAmount: 0.0,
      }),
      Expense.create({
        name: 'Restaurants',
        plannedAmount: 0.0,
      }),
    ],
  }),
];
