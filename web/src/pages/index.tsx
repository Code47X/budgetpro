import { Card, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';
import { useCurrentUser } from '../components/hooks/useCurrentUser';
import { UserCard } from '../components/UI/UserCard';
import { withApollo } from '../utils/withApollo';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  linksCard: {
    width: '100%',
    marginTop: spacing(3),
  },
  listItem: {
    textAlign: 'center',
  },
}));

const PAGE_LINKS = [
  { href: '/login', text: 'Login' },
  { href: '/signup', text: 'Sign Up' },
];

const AUTH_LINKS = [
  { href: '/my/budget', text: 'My Budget' },
  //
];

const IndexPage: React.FC = () => {
  const classes = useStyles();
  const { currentUser } = useCurrentUser();

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Typography component="h1" variant="h5">
          BudgetPro
        </Typography>
        <Card className={classes.linksCard}>
          <List>
            {PAGE_LINKS.map((link, i) => (
              <Link key={i} href={link.href}>
                <ListItem className={classes.listItem} button>
                  <ListItemText primary={link.text} />
                </ListItem>
              </Link>
            ))}

            {/* Authorized Pages */}
            {currentUser &&
              AUTH_LINKS.map((link, i) => (
                <Link key={i} href={link.href}>
                  <ListItem className={classes.listItem} button>
                    <ListItemText primary={link.text} />
                  </ListItem>
                </Link>
              ))}
          </List>
        </Card>
      </Container>

      <UserCard />
    </>
  );
};

export default withApollo({ ssr: true })(IndexPage);
