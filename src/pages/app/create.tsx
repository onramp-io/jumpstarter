import { Box, Heading } from 'grommet';
import type { NextPage } from 'next';
import ProjectForm from '@frontend/components/projectForm';

const Create: NextPage = () => {
  return (
    <>
      <Box>
        <Heading>Create a new project</Heading>
        <ProjectForm />
      </Box>
    </>
  );
};

export default Create;
