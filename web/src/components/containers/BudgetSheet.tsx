import { Stack } from '@mui/material';
import React, { useState } from 'react';
import { useBudgetQuery } from '../../generated/graphql';
import { BudgetGroupCard } from '../UI/BudgetGroupCard';

function BudgetSheet() {
  const [budgetDate, _setBudgetDate] = useState<Date>(new Date());

  const { data } = useBudgetQuery({
    variables: {
      input: {
        month: budgetDate.getMonth(),
        year: budgetDate.getFullYear(),
      },
    },
  });

  const incomeGroups = data?.budget?.budgetGroups.filter(
    budgetGroup => budgetGroup.type == 'Income'
  );

  const expenseGroups = data?.budget?.budgetGroups.filter(
    budgetGroup => budgetGroup.type == 'Expense'
  );

  return (
    <Stack spacing={4}>
      {incomeGroups?.map(incomeGroup => (
        <BudgetGroupCard key={incomeGroup.id} budgetGroup={incomeGroup} />
      ))}
      {expenseGroups?.map(expenseGroup => (
        <BudgetGroupCard key={expenseGroup.id} budgetGroup={expenseGroup} />
      ))}
    </Stack>
  );
}

export default BudgetSheet;
