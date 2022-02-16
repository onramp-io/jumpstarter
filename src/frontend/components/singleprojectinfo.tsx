import type { NextPage } from 'next';
import { Box, Button, Grid, Heading, Image, Meter, Paragraph, Table, TableCell, Text } from 'grommet';
import { Favorite } from 'grommet-icons';
import { TableRow } from '@mui/material';

interface SingleProjectInfoProps {
  projectTitle: string,
  projectDescription: string,
  projectFundGoal: number,
  projectCurrFunds: number,
  projectDeadline: Date,
  projectPictures: string[],
  projectInvestors: number
}

const SingleProjectInfo: NextPage<SingleProjectInfoProps> = ({ projectTitle, projectDescription, projectFundGoal, projectCurrFunds, projectDeadline, projectPictures, projectInvestors }) => {
  return (
    <Box 
        direction="column" 
        alignContent="center" 
        margin={{
            horizontal: "xlarge"
            }}
    >
        <Grid
          rows={['0.3fr', '0.7fr', '1fr', '1.fr', '0.3fr']}
          columns={['1.5fr', '1.5fr']}
          gap={{
            column: "large"
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
          <Heading gridArea="title" textAlign="center" fill={true}>{projectTitle}</Heading>

          <Box gridArea="image">
            <Image fit="cover" width="100%" max-height="100%" src={projectPictures[0]}/>
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
                        <Heading size="xsmall" margin={{
                        vertical: "small"
                        }}
                        >Goal: ${projectFundGoal.toLocaleString()}</Heading>
                        <Text>Target Date: {projectDeadline.toDateString()}</Text>
                    </Box>
                    <Box margin="small" align="end">
                        <Favorite size="large"/>
                    </Box>
              </Grid>
          </Box>

          <Box 
            gridArea="progress" 
            border={{ color: "lightgrey" }} 
            round={true} pad="medium" 
            margin={{
              top: "large",
              bottom: "medium"
            }}
            >
              <Table>
                  <TableRow>
                    <TableCell scope="col"><strong>Raised</strong></TableCell>
                    <TableCell scope="col"><strong>Remaining</strong></TableCell>
                    <TableCell scope="col"><strong>Investors</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope="col">${projectCurrFunds.toLocaleString()}</TableCell>
                    <TableCell scope="col">${(projectFundGoal - projectCurrFunds).toLocaleString()}</TableCell>
                    <TableCell scope="col">{projectInvestors.toLocaleString()}</TableCell>
                  </TableRow>
              </Table>
              <Meter max={projectFundGoal} value={projectCurrFunds}  background="light-3" size="full" margin={{
                  top: "small"
              }} alignSelf="stretch"/>
          </Box>

          <Box gridArea="info">
            <Heading size="small" margin={{
                bottom: "small"
            }}>Info</Heading>
            <Paragraph fill={true} margin={{
                top: "none",
                bottom: "large"
            }}>{projectDescription}</Paragraph>
          </Box>

          <Button gridArea="button" margin={{horizontal: "xlarge"}} primary label="JumpStart this project"/>
        </Grid>
      </Box>
  );
};

export default SingleProjectInfo;
