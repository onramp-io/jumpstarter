import type { NextPage } from 'next';
import { Avatar, Box, Grid, Text } from 'grommet';

const Comment: NextPage = () => {
  return (
    <Box direction="column" alignContent="center" margin={{horizontal: "18rem", vertical: "large"}} pad={{horizontal: "xlarge"}}>
      <Grid height="small"
      rows={['1fr', '3fr']}
      columns={['0.5fr', '1fr', '3fr']}
      areas={[
        { name: 'icon', start: [0, 1], end: [0, 1]},
        { name: 'username', start: [1, 0], end: [1, 0]},
        { name: 'comment', start: [1, 1], end: [2, 1]}
      ]}
      >
        <Avatar gridArea="icon" size="large" alignSelf='center' src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"/>

        <Box gridArea="username" direction="row">
          <Text alignSelf='end' margin={{
            bottom: "small"
          }}>User Name</Text>
        </Box>

        <Box gridArea="comment" border={true} fill={true} >
          <Text margin="medium">This is a comment. Cool nice comment love it.</Text>
        </Box>
      </Grid>
    </Box>
  );
};

export default Comment;
