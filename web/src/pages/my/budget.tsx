import { Container, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { BudgetGroupCard } from '../../components/UI/BudgetGroupCard';
import { UserCard } from '../../components/UI/UserCard';
import { AuthenticatedPage } from '../../components/utils/AuthenticatedPage';
import { useBudgetQuery } from '../../generated/graphql';
import { withApollo } from '../../utils/withApollo';

const BudgetPage: React.FC = () => {
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
    <AuthenticatedPage>
      <Container maxWidth="md">
        <Grid container direction="column">
          {incomeGroups?.map(incomeGroup => (
            <BudgetGroupCard key={incomeGroup.id} budgetGroup={incomeGroup} />
          ))}

          {expenseGroups?.map(expenseGroup => (
            <BudgetGroupCard key={expenseGroup.id} budgetGroup={expenseGroup} />
          ))}
        </Grid>
      </Container>

      <UserCard />
    </AuthenticatedPage>
  );
};

export default withApollo()(BudgetPage);
