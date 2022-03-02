import type { NextPage } from 'next';
import { Box, Button, Grid, Heading, Image, Meter, Paragraph, Table, TableRow, TableCell, Text } from 'grommet';
import { Like } from 'grommet-icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '@frontend/context/AuthProvider';
import axios from '../../axios/instance';
import urls from 'helpers/urls'; 


type projectType = {
  id: number;
  title: string,
  description: string,
  fund_goal: number,
  fund_raised: number,
  end_date: Date,
  pictures: string[],
  investors: number,
  likesAmt: number,
  remaining: string
}

interface SingleProjectInfoProps {
  projectDetails: projectType
}

const SingleProjectInfo: NextPage<SingleProjectInfoProps> = ({ projectDetails }): JSX.Element => {

  const { firstName, accessToken } = useAuth();
  const [like, setLike] = useState(false);
  const [likeTotal, setLikeTotal] = useState(0);
  const router = useRouter();

  const checkIfLiked = async (projectId) => {
    const response = await axios.get(urls.likes + projectId);
    if (response.data.data) {
      setLike(true);
    }
  }

  const submitLike = async (event: any) => {
    let newLikeTotal = 0;
    if (!like) {
      const user = await axios.get(urls.getUser);
      newLikeTotal = likeTotal + 1;
      const body = {
        userId: user.data.userData['id'],
        projectId: router.query.projectId,
      }
      await axios.post(urls.likes, body);
      setLike(true);
    } else {
      newLikeTotal = likeTotal - 1;
      await axios.delete(urls.likes + router.query.projectId);
      setLike(false);
    }
    setLikeTotal(newLikeTotal);
  }

  const goToCheckOut = async (event: any) => {
    if (firstName) {
      router.push(urls.checkout + router.query.projectId);
    } else {
      router.push(urls.loginRedirect);
    }
  }

  useEffect(()=>{
    //make sure url is populated and user is logged in before pulling query params
    if(!router.isReady || !firstName) return;
    
    if (firstName) {
      checkIfLiked(router.query.projectId);
    }

  }, [router.isReady, firstName]); 

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
          <Heading gridArea="title" textAlign="center" fill={true}>{projectDetails.title}</Heading>

          <Box gridArea="image">
            <Image fit="cover" width="100%" max-height="100%" src={projectDetails.pictures[0]}/>
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
                        >Goal: ${projectDetails.fund_goal.toLocaleString()}</Heading>
                        <Text>Target Date: {projectDetails.end_date.toDateString()}</Text>
                    </Box>
                    <Box margin="small" align="end">
                        {((firstName) && (!like)) && (
                          <Like onClick={(event) => submitLike(event)} size="large" style={{cursor: "pointer"}}/>
                        )}
                        {((firstName) && (like)) && (
                          <Text onClick={(event) => submitLike(event)} color="brand" style={{cursor: "pointer"}}>Liked</Text>
                        )}
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
                    <TableCell scope="col"><strong>Likes</strong></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell scope="col">${projectDetails.fund_raised.toLocaleString()}</TableCell>
                    <TableCell scope="col">{projectDetails.remaining}</TableCell>
                    <TableCell scope="col">{projectDetails.investors.toLocaleString()}</TableCell>
                    <TableCell scope="col">{projectDetails.likesAmt.toLocaleString()}</TableCell>
                  </TableRow>
              </Table>
              <Meter max={projectDetails.fund_goal} value={projectDetails.fund_raised}  background="light-3" size="full" margin={{
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
            }}>{projectDetails.description}</Paragraph>
          </Box>

          <Button onClick={(event) => goToCheckOut(event)} gridArea="button" margin={{horizontal: "xlarge"}} primary label="JumpStart this project"/>
        </Grid>
      </Box>
  );
};

export default SingleProjectInfo;
