import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useBudgetQuery } from '../../generated/graphql';
import { BudgetGroupCard } from '../UI/BudgetGroupCard';

interface BudgetSheetProps {}

export const BudgetSheet: React.FC<BudgetSheetProps> = () => {
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
    <>
      <Grid container direction="column">
        {incomeGroups?.map(incomeGroup => (
          <BudgetGroupCard key={incomeGroup.id} budgetGroup={incomeGroup} />
        ))}
        {expenseGroups?.map(expenseGroup => (
          <BudgetGroupCard key={expenseGroup.id} budgetGroup={expenseGroup} />
        ))}
      </Grid>
    </>
  );
};
