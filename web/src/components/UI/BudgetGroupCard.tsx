import { Box, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { BudgetGroup, BudgetItem, useReorderBudgetItemsMutation } from '../../generated/graphql';

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

const BudgetItemRow = ({ budgetItem, idx }: { budgetItem: BudgetItem; idx: number }) => (
  <Draggable draggableId={budgetItem.id} index={idx}>
    {provided => (
      <Grid
        container
        innerRef={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
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
    )}
  </Draggable>
);

interface BudgetGroupCardProps {
  budgetGroup: BudgetGroup;
}

export const BudgetGroupCard: React.FC<BudgetGroupCardProps> = ({ budgetGroup }) => {
  const classes = useStyles();
  const [reorderBudgetItems] = useReorderBudgetItemsMutation();

  const handleReorder = (srcIndex: number, destIndex: number) => {
    const tempBudgetItems = [...budgetGroup.budgetItems];
    const [budgetItem] = tempBudgetItems.splice(srcIndex, 1);
    tempBudgetItems.splice(destIndex, 0, budgetItem);

    return tempBudgetItems.map((item, idx) => {
      return {
        ...item,
        position: idx,
      };
    });
  };

  const onDragEnd = async ({ destination, source }: DropResult) => {
    if (!destination || destination.index === source.index) {
      return;
    }

    const newBudgetItems = handleReorder(source.index, destination.index);

    await reorderBudgetItems({
      variables: {
        input: {
          id: Number(budgetGroup.id),
          budgetItems: newBudgetItems.map(item => {
            return { id: Number(item.id) };
          }),
        },
      },
      optimisticResponse: {
        reorderBudgetItems: {
          ...budgetGroup,
          budgetItems: newBudgetItems,
        },
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Paper className={classes.root}>
        <Box display="flex" flexDirection="column">
          <HeaderRow budgetGroup={budgetGroup} />
          <Divider />
          <Droppable droppableId={budgetGroup.id}>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {budgetGroup.budgetItems.map((budgetItem, idx) => (
                  <BudgetItemRow key={budgetItem.id} budgetItem={budgetItem} idx={idx} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Box>
      </Paper>
    </DragDropContext>
  );
};
