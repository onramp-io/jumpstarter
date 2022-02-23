import { Box, Heading } from 'grommet';
import type { NextPage } from 'next';
import ProjectForm from '@frontend/components/projectForm';

const CreateProject: NextPage = () => {
  const projectFormDetails = {
    title: "",
    category: "",
    description: "",
    end_date: new Date().toString(),
    fund_goal: 0,
    fund_tiers: [0, 0, 0, 0],
    pictures: []
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
