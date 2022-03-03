import { Box, Heading } from 'grommet';
import type { NextPage } from 'next';
import ProjectForm from '@frontend/components/projectForm';

const EditProject: NextPage = () => {
  const projectFormDetails = {
    title: "Current Title",
    category: "Film",
    description: "Current description.",
    end_date: "01/01/2030",
    fund_goal: 10000,
    fund_tiers: [0, 100, 1000, 2000],
    pictures: ["weh"]
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

export default EditProject;
