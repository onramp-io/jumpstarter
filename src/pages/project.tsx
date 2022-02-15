import type { NextPage } from 'next';
import { Box, Button, Grid, Heading, Image, Meter, Paragraph, Text } from 'grommet';
import { Favorite } from 'grommet-icons';
import Comment from '@frontend/components/comment';
import ProjectInfo from '@frontend/components/projectinfo';

const Project: NextPage = () => {
  return (
    <>
      <ProjectInfo/>
      <Comment />
    </>
  );
};

export default Project;
