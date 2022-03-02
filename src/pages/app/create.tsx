import { Box, Heading } from 'grommet';
import type { NextPage } from 'next';
import ProjectForm from '@frontend/components/projectForm';

const CreateProject: NextPage = () => {
  const projectFormDetails = {
    title: "",
    category: "",
    description: "",
    launchDate: new Date(),
    fundTiers: [0, 0, 0, 0],
    pictures: [],
    createOrEdit: "create"
  }

  return (
    <>
      <Box>
        <Heading alignSelf="center" margin={{top: "xlarge"}}>Create a new project</Heading>
        <ProjectForm projectFormState={projectFormDetails}/>
      </Box>
    </>
  );
};

export default CreateProject;
