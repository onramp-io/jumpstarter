import type { NextPage } from 'next';
import { Box, Button, Heading, Text, TextArea } from 'grommet';
import { Favorite } from 'grommet-icons';
import Comment from '@frontend/components/comment';
import ProjectInfo from '@frontend/components/projectinfo';

const Project: NextPage = () => {
  return (
    <>
      <ProjectInfo/>

      <Heading textAlign="center" fill={true} margin={{left: '2rem', top: '5rem'}}>Comments</Heading>
      <Box margin={{horizontal: '25rem'}} height="small">
        <TextArea placeholder="Leave a comment." resize={false} fill={true} size="medium" />
        <Button primary label="Submit" alignSelf="end" margin={{top: "1.5rem"}}/>
      </Box>
      <Comment />
      <Comment />
      <Comment />
    </>
  );
};

export default Project;
