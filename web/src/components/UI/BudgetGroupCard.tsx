import { Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { BudgetGroup, BudgetItem } from '../../generated/graphql';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    margin: spacing(4, 0, 0, 0),
    padding: spacing(2),
  },
}));

const HeaderRow = ({ budgetGroup }: { budgetGroup: BudgetGroup }) => (
  <Grid container>
    <Grid item xs={6}>
      <Typography variant="h6">{budgetGroup.label}</Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography variant="h6" align="right">
        Planned
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography variant="h6" align="right">
        Actual
      </Typography>
    </Grid>
  </Grid>
);

const BudgetItemRow = ({ budgetItem }: { budgetItem: BudgetItem }) => (
  <>
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="body1">{budgetItem.name}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body1" align="right">
          {budgetItem.plannedAmount}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body1" align="right">
          $0.00
        </Typography>
      </Grid>
    </Grid>
    <Divider />
  </>
);

interface BudgetGroupCardProps {
  budgetGroup: BudgetGroup;
}

export const BudgetGroupCard: React.FC<BudgetGroupCardProps> = ({ budgetGroup }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container direction="column">
        <HeaderRow budgetGroup={budgetGroup} />
        <Divider />
        {budgetGroup.budgetItems.map(budgetItem => (
          <BudgetItemRow key={budgetItem.id} budgetItem={budgetItem} />
        ))}
      </Grid>
    </Paper>
  );
};
