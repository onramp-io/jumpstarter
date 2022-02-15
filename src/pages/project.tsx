import type { NextPage } from 'next';
import { Box, Button, Grid, Heading, Image, Meter, Paragraph, Text } from 'grommet';
import { Favorite } from 'grommet-icons';
import Comment from '@frontend/components/comment';

const Project: NextPage = () => {
  return (
    <>
      <Box direction="column" alignContent="center" margin="xlarge">
        <Grid
          rows={['0.3fr', '1fr', '1fr', '0.3fr']}
          columns={['2fr', '1.5fr']}
          areas={[
            { name: 'title', start: [0, 0], end: [1, 0]},
            { name: 'image', start: [0, 1], end: [0, 3]},
            { name: 'goal', start: [1, 1], end: [1, 1]}
          ]}>
          <Heading gridArea="title" textAlign="center">Project XYZ</Heading>
          <Box gridArea="image">
            <Image fit="cover" width="100%" max-height="100%" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"/>
          </Box>
          <Box gridArea="goal">
            <Heading>Goal: $1000</Heading>
            <Text>Target Date: 03/07/2020</Text>
            <Favorite/>
          </Box>
          <Box>
            <Heading>Info</Heading>
            <Paragraph>This is a description of the project. Pretty cool huh.</Paragraph>
          </Box>
          <Button primary label="JumpStart this project" />
        </Grid>
      </Box>

      <Comment />
    </>
  );
};

export default Project;
