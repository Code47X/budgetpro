import { Avatar, Card, CardHeader, createStyles, makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      minWidth: 275,
    },
  })
);

const getUserInitials = (firstName: string, lastName: string) => {
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
};

export const UserCard: React.FC = () => {
  const classes = useStyles();
  const { data, loading } = useMeQuery();

  const cardTitle = data?.me ? `${data.me.firstName} ${data.me.lastName}` : 'User not logged in';
  const cardSubtitle = data?.me ? data.me.email : null;
  const avatarInitials = data?.me ? getUserInitials(data.me.firstName, data.me.lastName) : null;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar>{avatarInitials}</Avatar>}
        title={loading ? <LinearProgress /> : cardTitle}
        subheader={cardSubtitle}
      />
    </Card>
  );
};
