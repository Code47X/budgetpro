import DateAdapter from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { isValid } from 'date-fns';
import React, { useState } from 'react';
import { BudgetDocument, useBudgetQuery, useCreateBudgetMutation } from '../../generated/graphql';
import TextField from '../UI/TextField';
import { BudgetGroupCard } from './BudgetGroupCard';

interface CreateNewMessageBoxProps {
  budgetDate: Date | null;
}

function CreateNewMessageBox({ budgetDate }: CreateNewMessageBoxProps) {
  const [createBudget] = useCreateBudgetMutation();

  const handleClick = async () => {
    await createBudget({
      variables: {
        input: {
          month: budgetDate!.getMonth(),
          year: budgetDate!.getFullYear(),
        },
      },
      refetchQueries: [
        {
          query: BudgetDocument,
          variables: {
            input: {
              month: budgetDate!.getMonth(),
              year: budgetDate!.getFullYear(),
            },
          },
        },
      ],
    });
  };

  const copy = {
    monthName: budgetDate?.toLocaleString('default', { month: 'long' }),
    year: budgetDate?.getFullYear(),
  };

  if (!isValid(budgetDate)) {
    return null;
  }

  return (
    <Paper sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6" paragraph>
        {`No budget for ${copy.monthName} ${copy.year}`}
      </Typography>
      <Button onClick={handleClick}>Create new</Button>
    </Paper>
  );
}

function BudgetSheet() {
  const [budgetDate, setBudgetDate] = useState<Date | null>(new Date());

  const { data, loading } = useBudgetQuery({
    skip: !isValid(budgetDate),
    variables: {
      input: {
        month: budgetDate!.getMonth(),
        year: budgetDate!.getFullYear(),
      },
    },
  });

  const incomeGroups = data?.budget?.budgetGroups.filter(
    budgetGroup => budgetGroup.type == 'Income'
  );

  const expenseGroups = data?.budget?.budgetGroups.filter(
    budgetGroup => budgetGroup.type == 'Expense'
  );

  const showCreateNewMessage = !loading && !data?.budget;

  return (
    <Stack spacing={4}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <DatePicker
          label="Date"
          views={['month', 'year']}
          value={budgetDate}
          onChange={val => setBudgetDate(val)}
          renderInput={params => <TextField {...params} sx={{ maxWidth: 200 }} />}
        />
      </LocalizationProvider>

      {showCreateNewMessage ? (
        <CreateNewMessageBox budgetDate={budgetDate} />
      ) : (
        <>
          {incomeGroups?.map(incomeGroup => (
            <BudgetGroupCard key={incomeGroup.id} budgetGroup={incomeGroup} />
          ))}
          {expenseGroups?.map(expenseGroup => (
            <BudgetGroupCard key={expenseGroup.id} budgetGroup={expenseGroup} />
          ))}
        </>
      )}
    </Stack>
  );
}

export default BudgetSheet;
