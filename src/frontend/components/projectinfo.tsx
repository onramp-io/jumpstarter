import type { NextPage } from 'next';
import { Box, Button, Grid, Heading, Image, Meter, Paragraph, Text } from 'grommet';
import { Favorite } from 'grommet-icons';

const ProjectInfo: NextPage = () => {
  return (
    <Box direction="column" alignContent="center" margin="xlarge">
        <Grid
          rows={['0.3fr', '0.7fr', '1fr', '1fr', '0.3fr']}
          columns={['1.5fr', '1.5fr']}
          gap={{
            column: "medium"
          }}
          areas={[
            { name: 'title', start: [0, 0], end: [1, 0]},
            { name: 'image', start: [0, 1], end: [0, 4]},
            { name: 'goal', start: [1, 1], end: [1, 1]},
            { name: 'progress', start: [1, 2], end: [1, 2]},
            { name: 'info', start: [1, 3], end: [1, 3]},
            { name: 'button', start: [1, 4], end: [1, 4]}
          ]}
          >
          <Heading gridArea="title" textAlign="center" fill={true}>Project XYZ</Heading>

          <Box gridArea="image">
            <Image fit="cover" width="100%" max-height="100%" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"/>
          </Box>

          <Box gridArea="goal">
              <Grid
                rows={['1fr']}
                columns={['2fr', '0.5fr']}
                areas={[
                    { name: 'text', start: [0, 0], end: [0, 0]},
                    { name: 'heart', start: [1, 0], end: [1, 0]}
                ]}>
                    <Box gridArea='text'>
                        <Heading size="small" margin={{
                        top: "small",
                        bottom: "small"
                        }}>Goal: $1,000</Heading>
                        <Text>Target Date: 03/07/2020</Text>
                    </Box>
                    <Box margin="small" align="end">
                        <Favorite size="large"/>
                    </Box>
              </Grid>
          </Box>

          <Box gridArea="progress">
              <Meter/>
          </Box>

          <Box gridArea="info">
            <Heading size="small" margin={{
                top: "small",
                bottom: "small"
            }}>Info</Heading>
            <Paragraph>This is a description of the project. Pretty cool huh.</Paragraph>
          </Box>

          <Button gridArea="button" primary label="JumpStart this project"/>
        </Grid>
      </Box>
  );
};

export default ProjectInfo;
