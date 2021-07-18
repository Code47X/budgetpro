import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useMeQuery } from '../generated/graphql';

interface IndexPageProps {}

const IndexPage: React.FC<IndexPageProps> = () => {
  const { data } = useMeQuery();

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {data?.me ? `Logged in with: ${data.me.email}` : 'Not logged in'}
        </Typography>
      </Box>
    </Container>
  );
};

export default IndexPage;
