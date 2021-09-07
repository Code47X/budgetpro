import { Avatar, Box, Card, CardHeader, Link, makeStyles, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useRouter } from 'next/router';
import React from 'react';
import { User } from '../../generated/graphql';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useLogout } from '../../hooks/useLogout';

const useStyles = makeStyles(() => ({
  card: {
    minWidth: 275,
  },
}));

const getInitials = (user: User) => {
  return user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
};

export const UserCard: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const logout = useLogout();

  const { currentUser, loading } = useCurrentUser();

  let cardContent = {
    title: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User not logged in',
    subtitle: currentUser ? currentUser.email : null,
    initials: currentUser ? getInitials(currentUser) : '',
    onClick: currentUser ? async () => await logout() : () => router.push('/login'),
  };

  return (
    <Box position="absolute" bottom={20} left={20}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" gutterBottom>
          Logged in as:
        </Typography>
        <Typography variant="caption">
          <Link component="button" onClick={cardContent.onClick}>
            {currentUser ? 'Logout' : 'Login'}
          </Link>
        </Typography>
      </Box>

      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar>{cardContent.initials}</Avatar>}
          title={loading ? <LinearProgress /> : cardContent.title}
          subheader={cardContent.subtitle}
        />
      </Card>
    </Box>
  );
};
