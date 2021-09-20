import { Divider, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { BudgetGroup, BudgetItem, useReorderBudgetItemsMutation } from '../../generated/graphql';

interface HeaderRowProps {
  budgetGroup: BudgetGroup;
}

function HeaderRow({ budgetGroup }: HeaderRowProps) {
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <TextField value={budgetGroup.label} />
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
}

interface BudgetItemRowProps {
  budgetItem: BudgetItem;
  idx: number;
}

function BudgetItemRow({ budgetItem, idx }: BudgetItemRowProps) {
  return (
    <Draggable draggableId={budgetItem.id} index={idx}>
      {provided => (
        <Grid
          container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          alignItems="center"
        >
          <Grid item xs={6}>
            <TextField value={budgetItem.name} size="small" />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={budgetItem.plannedAmount}
              size="small"
              inputProps={{ sx: { textAlign: 'right' } }}
            />
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
}

interface BudgetGroupCardProps {
  budgetGroup: BudgetGroup;
}

export function BudgetGroupCard({ budgetGroup }: BudgetGroupCardProps) {
  const [reorderBudgetItems] = useReorderBudgetItemsMutation();

  const handleReorder = (srcIndex: number, destIndex: number) => {
    const newArr = [...budgetGroup.budgetItems];
    newArr.splice(destIndex, 0, newArr.splice(srcIndex, 1)[0]);

    return newArr.map((item, idx) => {
      return {
        ...item,
        position: idx,
      };
    }) as BudgetItem[];
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
      <Paper sx={{ p: 4 }}>
        <Stack spacing={2}>
          <HeaderRow budgetGroup={budgetGroup} />
          <Divider />
          <Droppable droppableId={budgetGroup.id}>
            {provided => (
              <Stack ref={provided.innerRef} {...provided.droppableProps} spacing={1}>
                {budgetGroup.budgetItems.map((budgetItem, idx) => (
                  <BudgetItemRow key={budgetItem.id} budgetItem={budgetItem} idx={idx} />
                ))}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </Stack>
      </Paper>
    </DragDropContext>
  );
}
