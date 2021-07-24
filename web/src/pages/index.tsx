import {
  Box,
  Card,
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';
import { UserCard } from '../components/UI/UserCard';

const useStyles = makeStyles(({ spacing }) =>
  createStyles({
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
  })
);

const IndexPage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Typography component="h1" variant="h5">
          BudgetPro
        </Typography>
        <Card className={classes.linksCard}>
          <List>
            <Link href="/login">
              <ListItem className={classes.listItem} button>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
            <Link href="/signup">
              <ListItem className={classes.listItem} button>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </Link>
          </List>
        </Card>
      </Container>

      <Box position="absolute" bottom={20} left={20}>
        <Typography variant="body1" gutterBottom>
          Logged in as:
        </Typography>
        <UserCard />
      </Box>
    </>
  );
};

export default IndexPage;
