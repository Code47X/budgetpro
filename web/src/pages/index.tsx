import { Container, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useCurrentUser } from '../components/hooks/useCurrentUser';
import { UserCard } from '../components/UI/UserCard';
import { withApollo } from '../utils/withApollo';

const PAGE_LINKS = [
  { href: '/login', text: 'Login', auth: false },
  { href: '/signup', text: 'Sign Up', auth: false },
  { href: '/my/budget', text: 'My Budget', auth: true },
];

function IndexPage() {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const pageLinks = currentUser ? PAGE_LINKS : PAGE_LINKS.filter(link => link.auth == false);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Typography variant="h5" textAlign="center" my={4}>
          BudgetPro
        </Typography>
        <Paper>
          <List component="nav">
            {pageLinks.map((link, i) => (
              <ListItemButton key={i} onClick={() => router.push(link.href)}>
                <ListItemText
                  primary={link.text}
                  primaryTypographyProps={{ textAlign: 'center' }}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Container>

      <UserCard />
    </>
  );
}

export default withApollo({ ssr: true })(IndexPage);
