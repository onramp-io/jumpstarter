import { Box, Heading } from 'grommet';
import type { NextPage } from 'next';
import ProjectForm from '@frontend/components/projectForm';

const Create: NextPage = () => {
  return (
    <>
      <Box>
        <ProjectForm />
      </Box>
    </>
  );
};

export default Create;
