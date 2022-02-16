import type { NextPage } from 'next';
import { Box, Button, Heading, Text } from 'grommet';
import { Favorite } from 'grommet-icons';
import Comment from '@frontend/components/comment';
import ProjectInfo from '@frontend/components/projectinfo';

const Project: NextPage = () => {
  return (
    <>
      <ProjectInfo/>

      <></>

      <Heading textAlign="center" fill={true} margin={{left: '2rem', top: '5rem'}}>Comments</Heading>
      <Comment />
    </>
  );
};

export default Project;
